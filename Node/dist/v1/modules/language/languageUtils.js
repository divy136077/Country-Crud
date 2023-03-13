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
exports.LanguageUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class LanguageUtils {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.LANGUAGE, input);
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.LANGUAGE, input, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.LANGUAGE, ["*"], "id = ? AND status!=2", [id]);
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            // search
            let filters = '';
            if (req.filters) {
                if (req.filters.search) {
                    filters += ` AND (title LIKE '%${req.filters.search}%')`;
                }
                if (req.filters.status) {
                    filters += ` AND status = ${req.filters.status}`;
                }
            }
            // pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }
            // sorting
            let orderBy = ` ORDER BY ${tables_1.Tables.LANGUAGE}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`;
            }
            // query
            let query = `SELECT * from ${tables_1.Tables.LANGUAGE} WHERE status = 1 `;
            if (filters !== '') {
                query += filters;
            }
            query += orderBy;
            const totalItems = yield My.query(query);
            if (req.limit && req.page) {
                query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
                const result = yield My.query(query);
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
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.LANGUAGE, { status: 2 }, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.query(`UPDATE ${tables_1.Tables.LANGUAGE} SET status = 2 WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    toggleStatus(ids, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.query(`UPDATE ${tables_1.Tables.LANGUAGE} SET status = ${status} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.LanguageUtils = LanguageUtils;
//# sourceMappingURL=languageUtils.js.map