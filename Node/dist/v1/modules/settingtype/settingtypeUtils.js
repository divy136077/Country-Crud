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
exports.SettingTypeUtils = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class SettingTypeUtils {
    /**
     * Create new record
     */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Sql.insert(tables_1.Tables.SETTINGTYPE, input);
        });
    }
    /**
     * Update existing record
     */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingType = yield Sql.updateFirst(tables_1.Tables.SETTINGTYPE, input, `id = ?`, [id]);
            if (settingType.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
    * Fetch single record with id
    */
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Sql.first(tables_1.Tables.SETTINGTYPE, ["*"], "id = ? AND status != 2", [id]);
        });
    }
    /**
    * Fetch single record with slug
    */
    getSetting(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Sql.query(`SELECT * FROM ${tables_1.Tables.SETTINGTYPE} AS st LEFT JOIN ${tables_1.Tables.SETTING} AS s ON st.id = s.setting_type_id WHERE st.slug = '${slug}' AND st.status != 2`);
        });
    }
    /**
     * Fetch all records
     */
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            //search
            let filters = '';
            if (req.filters) {
                if (req.filters.hasOwnProperty('status')) {
                    filters += ` status = ${req.filters.status}`;
                }
                else {
                    filters += ` status != 2 `;
                }
                if (req.filters.search) {
                    filters += ` AND name LIKE '%${req.filters.search}%'`;
                }
            }
            //pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }
            //sorting
            let orderBy = ` ORDER BY ${tables_1.Tables.SETTINGTYPE}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            //query
            let query = `SELECT * from ${tables_1.Tables.SETTINGTYPE} WHERE `;
            if (filters != '') {
                query += filters;
            }
            query += orderBy;
            let totalItems = yield Sql.query(query);
            if (req.limit && req.page) {
                query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
                let result = yield Sql.query(query);
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
    /**
     * Single delete
     */
    delete(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingType = yield Sql.updateFirst(tables_1.Tables.SETTINGTYPE, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
            if (settingType.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * Multile delete
     */
    deleteMany(ids, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingType = yield Sql.query(`UPDATE ${tables_1.Tables.SETTINGTYPE} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);
            if (settingType.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * Toggle status from Active/Inactive
     */
    toggleStatus(ids, status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingType = yield Sql.query(`UPDATE ${tables_1.Tables.SETTINGTYPE} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (settingType.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.SettingTypeUtils = SettingTypeUtils;
//# sourceMappingURL=settingtypeUtils.js.map