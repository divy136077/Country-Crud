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
exports.SettingUtils = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class SettingUtils {
    /**
     * Create new record with encryption
     */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield Sql.insert(tables_1.Tables.SETTING, input);
            const User = yield Sql.query("UPDATE " + tables_1.Tables.SETTING + " SET value = AES_ENCRYPT('" + input.value + "', '" + process.env.SECRET_KEY + "') WHERE id = ?", [newUser.insertId]);
            // Here update query because we don't know how many fields would come in input from user
            return newUser;
        });
    }
    /**
     * Update existing record with encryption
     */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield Sql.updateFirst(tables_1.Tables.SETTING, input, `id = ?`, [id]);
            const User = yield Sql.query("UPDATE " + tables_1.Tables.SETTING + " SET value = AES_ENCRYPT('" + input.value + "', '" + process.env.SECRET_KEY + "') WHERE id = ?", [id]);
            // Here update query because we don't know how many fields would come in input from user
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * Fetch single record with encryption
     */
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Sql.query("SELECT *, AES_DECRYPT(value, '" + process.env.SECRET_KEY + "') as value FROM " + tables_1.Tables.SETTING + " WHERE status != 2 AND id = ? ", [Number(id)]);
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
            let orderBy = ` ORDER BY ${tables_1.Tables.SETTING}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            //query
            let query = `SELECT * from ${tables_1.Tables.SETTING} WHERE `;
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
            const module = yield Sql.updateFirst(tables_1.Tables.SETTING, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * Multiple delete
     */
    deleteMany(ids, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield Sql.query(`UPDATE ${tables_1.Tables.SETTING} SET status = 2, deleted_by = ${user_id}WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
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
            const module = yield Sql.query(`UPDATE ${tables_1.Tables.SETTING} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * Update existing record with encryption
     * @returns true
     */
    updateExistingData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Sql.query("SELECT id, value FROM " + tables_1.Tables.SETTING);
            var updatedResult;
            if (result) {
                result.forEach((item) => {
                    updatedResult = Sql.query("UPDATE " + tables_1.Tables.SETTING + " SET value = AES_ENCRYPT('" + item.value.toString() + "', '" + process.env.SECRET_KEY + "') WHERE id = ?", [item.id]);
                });
            }
            return true;
        });
    }
}
exports.SettingUtils = SettingUtils;
//# sourceMappingURL=settingUtils.js.map