import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";
import * as jwttoken from "jsonwebtoken";

export class MenusUtils {

  /* To create new menu */
  public async create(input) {
    return await My.insert(Tables.MENUS, input);
  }

  /** To update existing menu */
  public async update(input, id: number) {
    const module = await My.updateFirst(Tables.MENUS, input, `id = ?`, [id]);
    if (module.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  /** To fetch single record */
  public async getOne(id: number) {
    return await My.first(Tables.MENUS, ["*"], "id = ? AND status != 2", [id]);
  }

  /** To fetch multiple records */
  public async getAll(req) {
    let response;

    //search
    let filters = '';
    if (req.filters) {
      if (req.filters.search) {
        filters += ` AND name LIKE '%${req.filters.search}%' OR location LIKE '%${req.filters.search}%' OR url LIKE '%${req.filters.search}%'`;
      }
      if (req.filters.hasOwnProperty('status')) {
        filters += ` AND status = ${req.filters.status}`;
      }
    }

    //pagination
    let offset;
    if (req.limit && req.page) {
      offset = (req.page - 1) * req.limit;
    }

    //sorting
    let orderBy = ` ORDER BY ${Tables.MENUS}.id DESC`;
    if (req.sortDir && req.sortField) {
      if (req.sortField == 'location') {
        orderBy = ` ORDER BY ${Tables.MENUS}.${req.sortField} ${req.sortDir}`
      }
      else if (req.sortField == 'url') {
        orderBy = ` ORDER BY ${Tables.MENUS}.${req.sortField} ${req.sortDir}`
      }
      else {
        orderBy = ` ORDER BY ${Tables.MENUS}.${req.sortField} ${req.sortDir}`
      }
    }

    //query
    let query = `SELECT * from ${Tables.MENUS} WHERE status != 2 `;
    if (filters != '') {
      query += filters;
    }

    query += orderBy;

    let totalItems = await My.query(query);

    if (req.limit && req.page) {
      query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
      let result = await My.query(query);

      response = {
        "totalItems": totalItems.length,
        "items": result
      }
    } else {
      response = {
        "totalItems": totalItems.length,
        "items": totalItems
      }
    }

    return response;
  }

  /* Single delete */
  public async delete(id: number, user_id: number) {

    try {
      const module = await My.updateFirst(Tables.MENUS, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
      if (module.affectedRows > 0) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      return error
    }


  }

  /** Multiple delete */
  public async deleteMany(ids: string, user_id: number) {
    const module = await My.query(`UPDATE ${Tables.MENUS} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);

    if (module.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  /** Toggle status from Active/Inactive */
  public async toggleStatus(ids: string, status, user_id: number) {
    const module = await My.query(`UPDATE ${Tables.MENUS} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);

    if (module.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  /** To get all the side bar menu data */
  public async getBackendMenu(req) {
    let response;

    //search
    let filters = '';
    if (req.body.filters) {
      if (req.body.filters) {
        filters += ` AND menu_type = '${req.body.filters.menu_type}'`;
      }
    }

    //query
    let query = `SELECT * from ${Tables.MENUS} WHERE portal_id = 1 AND status = 1 `;
    if (filters != '') {
      query += filters;
    }

    // query += orderBy;

    let totalItems = await My.query(query);

    if (req.limit && req.page) {
      // query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
      let result = await My.query(query);

      response = {
        "totalItems": totalItems.length,
        "items": result
      }
    } else {
      response = {
        "totalItems": totalItems.length,
        "items": totalItems
      }
    }

    await this.checktoken(req);
    console.log(req.payload);

    if (req.payload && Object.keys(req.payload).length > 0) {
      if ((req.payload.device_token.permissions && req.payload.device_token.permissions.length > 0) || (req.payload.device_token.user_permission && req.payload.device_token.user_permission.length > 0)) {
        const permissionArr = req.payload.device_token.permissions ? JSON.parse(req.payload.device_token.permissions) : JSON.parse(req.payload.device_token.user_permission);

        const permission = permissionArr[0]["rbac"];
        const finObj = Object.values(permission);
        const arr = [];
        const data = Object.assign({}, ...finObj);

        for (let i = 0; i < response.items.length; i++) {
          const obj = response.items[i];
          if (obj.parent == 0) {
            arr.push(obj);
          } else {
            if (data.hasOwnProperty(obj.slug)) {
              const rightsArr = data[obj.slug];
              let permissionSlug = obj.slug + '/view';
              if (rightsArr && rightsArr.indexOf(permissionSlug) != -1) {
                arr.push(obj);
              }
            } else {
              console.error(`This object is not defined in permission array : ${obj.slug}`);
            }
          }
        }

        const results = await this.menuRecursive(arr, '', '', []);
        return arr;
      } else {
        console.error(`Menu Payload permission array not defined`);
        return response;
      }
    } else {
      console.error(`Menu payload not defined :`);
      return response;
    }
  }

  /** Check token for backend menu */
  public checktoken = (req) => {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      jwttoken
        .verify(authorization.split(' ')[1],
          process.env.JWT_SECRET, (err, token) => {
            req.payload = token;
          });
    }
  }

  /** Get all the menu and sub-menu */
  public async menuRecursive(t, c, name, a = []) {
    for (let i = 0; i < t.length; i++) {

      if (t[i].parent == c) {
        const children = await this.menuRecursive(t, t[i].id, name);
        if (children.length) {
          t[i].child = true;
          t[i].submenu = children;
        }
        a.push(t[i]);
      }
    }

    return a;
  }

  /** Get slug from menu */
  public slug = async (title?, fieldName?, id = null, dataModal?) => {
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const query = { status: 1 };
    let where = '';
    if (slug) {
      const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
      where += ` slug ${likePatten} AND status != 2 `;
    }
    const obj = { where: query };
    const templateData = await My.query(`SELECT slug FROM menus WHERE  slug LIKE '%${slug}%' AND status != 2`);
    const originalSlug = slug;
    const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);

    return latestSlug;
  }

  /** Get recursive slug */
  public recursiveSlug = (data?, originalSlug?, slug?, number?, id?) => {
    if (id == null) {
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].slug === slug || data[i].Slug === slug) {
          flag = true;
        }

        if (flag && (i == (data.length - 1))) {
          number++;
          slug = originalSlug + '-' + number;

          return this.recursiveSlug(data, originalSlug, slug, number);
        }
      }

      return slug;
    } else {
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].slug == slug && (data[i].id != id || data[i].ID != id) || data[i].Slug == slug && (data[i].id != id || data[i].ID != id)) {
          flag = true;
        }

        if (flag && (i == (data.length - 1))) {
          number++;
          slug = originalSlug + '-' + number;

          return this.recursiveSlug(data, originalSlug, slug, number);
        }
      }

      return slug;
    }
  }

}