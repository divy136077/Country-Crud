import { Console } from "console";
import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";
import { Utils } from "../../../helpers/utils";

export class RightsUtils {

    /**Create slug for rights*/
    public slug = async (title?, fieldName?, id = null, dataModal?) => {
        //  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const slug = title.toLowerCase().replace(/ /g, '-')
        const query = { status: 1 };
        let where = '';
        if (slug) {
            const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
            where += ` slug ${likePatten} AND status != 2 `;
        }
        const obj = { where: query };
        const templateData = await My.query(`SELECT slug FROM rights WHERE  slug LIKE '%${slug}%' AND status != 2`);
        const originalSlug = slug;
        const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);
        return latestSlug;
    }

    /** Create recursive  */
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

    /** Create new record */
    public async create(input) {
        return await My.insert(Tables.RIGHTS, input);
    }

    /** Udate existing record */
    public async update(input, id: number) {
        console.log(input)
        const rights = await My.updateFirst(Tables.RIGHTS, input, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Fetch single record*/
    public async getOne(id: number) {
        return await My.first(Tables.RIGHTS, ["*"], "id = ? AND status != 2", [id]);
    }

    /** Fetch multiple records*/
    public async getAll(req: any) {
        let response;
        //search
        let filters = '';
        if (req.filters) {
            if (req.filters.search) {
                filters += ` AND (${Tables.RIGHTS}.name LIKE '%${req.filters.search}%' OR ${Tables.MODULES}.name LIKE '%${req.filters.search}%' OR ${Tables.PORTAL}.name LIKE '%${req.filters.search}%' )`;
            }
            if (req.filters.hasOwnProperty('status')) {
                filters += ` AND ${Tables.RIGHTS}.status = ${req.filters.status}`;
            }
        }

        //pagination
        let offset;
        if (req.limit && req.page) {
            offset = (req.page - 1) * req.limit;
        }

        //sorting
        let orderBy = ` ORDER BY ${Tables.RIGHTS}.id DESC`;
        if (req.sortDir && req.sortField) {
            orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        //query
        let query = `SELECT ${Tables.RIGHTS}.*,${Tables.MODULES}.name as module_name,${Tables.PORTAL}.name as portal_name from ${Tables.RIGHTS} `+
        `LEFT JOIN ${Tables.MODULES} ON ${Tables.RIGHTS}.module_id = ${Tables.MODULES}.id  LEFT JOIN ${Tables.PORTAL} ON ${Tables.RIGHTS}.portal_id = ${Tables.PORTAL}.id WHERE ${Tables.RIGHTS}.status != 2 `;

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

    /**Single delete */
    public async delete(id: number, user_id: number) {
        const rights = await My.updateFirst(Tables.RIGHTS, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Multiple deletes*/
    public async deleteMany(ids: string, user_id: number) {
        const rights = await My.query(`UPDATE ${Tables.RIGHTS} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Toggle status from Active/Inactive*/
    public async toggleStatus(ids: string, status, user_id: number) {
        const rights = await My.query(`UPDATE ${Tables.RIGHTS} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
       
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

}