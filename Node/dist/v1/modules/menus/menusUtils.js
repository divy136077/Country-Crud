"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const jwttoken = require("jsonwebtoken");
class MenusUtils {
    constructor() {
        /** Check token for backend menu */
        this.checktoken = (req) => {
            const { headers: { authorization }, } = req;
            if (authorization) {
                jwttoken
                    .verify(authorization.split(' ')[1], process.env.JWT_SECRET, (err, token) => {
                    req.payload = token;
                });
            }
        };
        /** Get slug from menu */
        this.slug = (title, fieldName, id = null, dataModal) => __awaiter(this, void 0, void 0, function* () {
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const query = { status: 1 };
            let where = '';
            if (slug) {
                const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
                where += ` slug ${likePatten} AND status != 2 `;
            }
            const obj = { where: query };
            const templateData = yield My.query(`SELECT slug FROM menus WHERE  slug LIKE '%${slug}%' AND status != 2`);
            const originalSlug = slug;
            const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);
            return latestSlug;
        });
        /** Get recursive slug */
        this.recursiveSlug = (data, originalSlug, slug, number, id) => {
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
            }
            else {
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
        };
    }
    /* To create new menu */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.MENUS, input);
        });
    }
    /** To update existing menu */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.updateFirst(tables_1.Tables.MENUS, input, `id = ?`, [id]);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** To fetch single record */
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.MENUS, ["*"], "id = ? AND status != 2", [id]);
        });
    }
    /** To fetch multiple records */
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let orderBy = ` ORDER BY ${tables_1.Tables.MENUS}.id DESC`;
            if (req.sortDir && req.sortField) {
                if (req.sortField == 'location') {
                    orderBy = ` ORDER BY ${tables_1.Tables.MENUS}.${req.sortField} ${req.sortDir}`;
                }
                else if (req.sortField == 'url') {
                    orderBy = ` ORDER BY ${tables_1.Tables.MENUS}.${req.sortField} ${req.sortDir}`;
                }
                else {
                    orderBy = ` ORDER BY ${tables_1.Tables.MENUS}.${req.sortField} ${req.sortDir}`;
                }
            }
            //query
            let query = `SELECT * from ${tables_1.Tables.MENUS} WHERE status != 2 `;
            if (filters != '') {
                query += filters;
            }
            query += orderBy;
            let totalItems = yield My.query(query);
            if (req.limit && req.page) {
                query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
                let result = yield My.query(query);
                response = {
                    "totalItems": totalItems.length,
                    "items": result
                };
            }
            else {
                response = {
                    "totalItems": totalItems.length,
                    "items": totalItems
                };
            }
            return response;
        });
    }
    /* Single delete */
    delete(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const module = yield My.updateFirst(tables_1.Tables.MENUS, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
                if (module.affectedRows > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    /** Multiple delete */
    deleteMany(ids, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.query(`UPDATE ${tables_1.Tables.MENUS} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Toggle status from Active/Inactive */
    toggleStatus(ids, status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.query(`UPDATE ${tables_1.Tables.MENUS} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** To get all the side bar menu data */
    getBackendMenu(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            //search
            let filters = '';
            if (req.body.filters) {
                if (req.body.filters) {
                    filters += ` AND menu_type = '${req.body.filters.menu_type}'`;
                }
            }
            //query
            let query = `SELECT * from ${tables_1.Tables.MENUS} WHERE portal_id = 1 AND status = 1 `;
            if (filters != '') {
                query += filters;
            }
            // query += orderBy;
            let totalItems = yield My.query(query);
            if (req.limit && req.page) {
                // query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
                let result = yield My.query(query);
                response = {
                    "totalItems": totalItems.length,
                    "items": result
                };
            }
            else {
                response = {
                    "totalItems": totalItems.length,
                    "items": totalItems
                };
            }
            yield this.checktoken(req);
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
                        }
                        else {
                            if (data.hasOwnProperty(obj.slug)) {
                                const rightsArr = data[obj.slug];
                                let permissionSlug = obj.slug + '/view';
                                if (rightsArr && rightsArr.indexOf(permissionSlug) != -1) {
                                    arr.push(obj);
                                }
                            }
                            else {
                                console.error(`This object is not defined in permission array : ${obj.slug}`);
                            }
                        }
                    }
                    const results = yield this.menuRecursive(arr, '', '', []);
                    return arr;
                }
                else {
                    console.error(`Menu Payload permission array not defined`);
                    return response;
                }
            }
            else {
                console.error(`Menu payload not defined :`);
                return response;
            }
        });
    }
    /** Get all the menu and sub-menu */
    menuRecursive(t, c, name, a = []) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < t.length; i++) {
                if (t[i].parent == c) {
                    const children = yield this.menuRecursive(t, t[i].id, name);
                    if (children.length) {
                        t[i].child = true;
                        t[i].submenu = children;
                    }
                    a.push(t[i]);
                }
            }
            return a;
        });
    }
}
exports.MenusUtils = MenusUtils;
//# sourceMappingURL=menusUtils.js.map