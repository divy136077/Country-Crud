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
exports.RoleUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class RoleUtils {
    /** Create new role*/
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            delete input.portal_id;
            return yield My.insert(tables_1.Tables.ROLES, input);
        });
    }
    /** Create new create role_portal_mapping */
    create_role_portal_mapping(input) {
        return __awaiter(this, void 0, void 0, function* () {
            delete input.name;
            delete input.created_by;
            delete input.status;
            return yield My.insert(tables_1.Tables.ROLE_PORTAL_MAPPING, input);
        });
    }
    /** Update existing role*/
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            delete input.portal_id;
            const role = yield My.updateFirst(tables_1.Tables.ROLES, input, `id = ?`, [id]);
            if (role.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Update existing role*/
    update_role_portal_mapping(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            delete input.name;
            delete input.updated_by;
            delete input.status;
            const role = yield My.updateFirst(tables_1.Tables.ROLE_PORTAL_MAPPING, input, `role_id = ?`, [id]);
            if (role.affectedRows > 0) {
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
            let query = `SELECT mapping.portal_id, role.* from ${tables_1.Tables.ROLES} as role 
            LEFT JOIN  ${tables_1.Tables.ROLE_PORTAL_MAPPING} as mapping ON 
            mapping.role_id = role.id
            WHERE role.id = ${id}`;
            let data = yield My.query(query);
            data = (data) ? data[0] : '';
            return data;
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
                    filters += ` AND name LIKE '%${req.filters.search}%'`;
                }
                if (req.filters.hasOwnProperty('status')) {
                    filters += ` AND status = ${req.filters.status}`;
                }
                if (req.filters.ids) {
                    filters += ` AND id IN (${req.filters.ids})`;
                }
            }
            //pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }
            //sorting
            let orderBy = ` ORDER BY ${tables_1.Tables.ROLES}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            //query
            let query = `SELECT * from ${tables_1.Tables.ROLES} WHERE status != 2 `;
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
    /** Single delete*/
    delete(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield My.updateFirst(tables_1.Tables.ROLES, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
            if (role.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Multiple delete*/
    deleteMany(ids, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield My.query(`UPDATE ${tables_1.Tables.ROLES} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);
            if (role.affectedRows > 0) {
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
            const role = yield My.query(`UPDATE ${tables_1.Tables.ROLES} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (role.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.RoleUtils = RoleUtils;
//# sourceMappingURL=roleUtils.js.map