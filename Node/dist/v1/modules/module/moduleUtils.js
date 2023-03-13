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
exports.ModuleUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class ModuleUtils {
    /** Create new record */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.MODULES, input);
        });
    }
    /** Update existing record */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.updateFirst(tables_1.Tables.MODULES, input, `id = ?`, [id]);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /** Get single record based on id*/
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.MODULES, ["*"], "id = ? AND status !=2", [id]);
        });
    }
    /** Get all records*/
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            //search
            let filters = '';
            if (req.filters) {
                if (req.filters.search) {
                    filters += ` AND (${tables_1.Tables.MODULES}.name LIKE '%${req.filters.search}%' OR ${tables_1.Tables.PORTAL}.name LIKE '%${req.filters.search}%')`;
                }
                if (req.filters.hasOwnProperty('status')) {
                    filters += ` AND ${tables_1.Tables.MODULES}.status = ${req.filters.status}`;
                }
            }
            //pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }
            //sorting
            let orderBy = ` ORDER BY ${tables_1.Tables.MODULES}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            //query
            let query = `SELECT ${tables_1.Tables.MODULES}.*,${tables_1.Tables.PORTAL}.name as portal_name from ${tables_1.Tables.MODULES} ` +
                `LEFT JOIN ${tables_1.Tables.PORTAL} ON ${tables_1.Tables.MODULES}.portal_id = ${tables_1.Tables.PORTAL}.id WHERE ${tables_1.Tables.MODULES}.status != 2 `;
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
            const module = yield My.updateFirst(tables_1.Tables.MODULES, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
            if (module.affectedRows > 0) {
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
            const module = yield My.query(`UPDATE ${tables_1.Tables.MODULES} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
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
            const module = yield My.query(`UPDATE ${tables_1.Tables.MODULES} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**Trucate table */
    truncateACL() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.query(`SET FOREIGN_KEY_CHECKS=0;TRUNCATE TABLE  ${tables_1.Tables.ROLES};TRUNCATE TABLE  ${tables_1.Tables.RIGHTS};TRUNCATE TABLE  ${tables_1.Tables.MODULES};SET FOREIGN_KEY_CHECKS=1;`);
        });
    }
    /** Fetch single record*/
    getmodule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * from ${tables_1.Tables.MODULES} where deleted = 0 AND status = 1 AND portal_id = ${id}`;
            let totalItems = yield My.query(query);
            return totalItems;
        });
    }
}
exports.ModuleUtils = ModuleUtils;
//# sourceMappingURL=moduleUtils.js.map