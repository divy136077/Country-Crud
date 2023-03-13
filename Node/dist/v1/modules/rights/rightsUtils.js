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
exports.RightsUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class RightsUtils {
    constructor() {
        /**Create slug for rights*/
        this.slug = (title, fieldName, id = null, dataModal) => __awaiter(this, void 0, void 0, function* () {
            //  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const slug = title.toLowerCase().replace(/ /g, '-');
            const query = { status: 1 };
            let where = '';
            if (slug) {
                const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
                where += ` slug ${likePatten} AND status != 2 `;
            }
            const obj = { where: query };
            const templateData = yield My.query(`SELECT slug FROM rights WHERE  slug LIKE '%${slug}%' AND status != 2`);
            const originalSlug = slug;
            const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);
            return latestSlug;
        });
        /** Create recursive  */
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
    /** Create new record */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.RIGHTS, input);
        });
    }
    /** Udate existing record */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(input);
            const rights = yield My.updateFirst(tables_1.Tables.RIGHTS, input, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Fetch single record*/
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.RIGHTS, ["*"], "id = ? AND status != 2", [id]);
        });
    }
    /** Fetch multiple records*/
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            //search
            let filters = '';
            if (req.filters) {
                if (req.filters.search) {
                    filters += ` AND (${tables_1.Tables.RIGHTS}.name LIKE '%${req.filters.search}%' OR ${tables_1.Tables.MODULES}.name LIKE '%${req.filters.search}%' OR ${tables_1.Tables.PORTAL}.name LIKE '%${req.filters.search}%' )`;
                }
                if (req.filters.hasOwnProperty('status')) {
                    filters += ` AND ${tables_1.Tables.RIGHTS}.status = ${req.filters.status}`;
                }
            }
            //pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }
            //sorting
            let orderBy = ` ORDER BY ${tables_1.Tables.RIGHTS}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            //query
            let query = `SELECT ${tables_1.Tables.RIGHTS}.*,${tables_1.Tables.MODULES}.name as module_name,${tables_1.Tables.PORTAL}.name as portal_name from ${tables_1.Tables.RIGHTS} ` +
                `LEFT JOIN ${tables_1.Tables.MODULES} ON ${tables_1.Tables.RIGHTS}.module_id = ${tables_1.Tables.MODULES}.id  LEFT JOIN ${tables_1.Tables.PORTAL} ON ${tables_1.Tables.RIGHTS}.portal_id = ${tables_1.Tables.PORTAL}.id WHERE ${tables_1.Tables.RIGHTS}.status != 2 `;
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
    /**Single delete */
    delete(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.RIGHTS, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Multiple deletes*/
    deleteMany(ids, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.query(`UPDATE ${tables_1.Tables.RIGHTS} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Toggle status from Active/Inactive*/
    toggleStatus(ids, status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.query(`UPDATE ${tables_1.Tables.RIGHTS} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.RightsUtils = RightsUtils;
//# sourceMappingURL=rightsUtils.js.map