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
exports.DocumentUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class DocumentUtils {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(input);
            return yield My.insert(tables_1.Tables.DOCUMENT, input);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await My.first(Tables.DOCUMENT, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
            let query = `SELECT dt.Name, d.IsActive, dt.Id AS DocumentTypeId, d.PeriodFrom, d.PeriodTo, d.DocumentName, d.DocumentPath  from ${tables_1.Tables.DOCUMENT} AS d Inner join ${tables_1.Tables.DOCUMENTTYPE} AS dt on dt.Id = d.DocumentTypeId  WHERE  d.Id=${id}`;
            const totalItems = yield My.query(query);
            return totalItems;
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            // query
            let query = `SELECT dt.Name, d.IsActive, dt.Id AS DocumentTypeId, d.PeriodFrom, d.PeriodTo, d.DocumentName, d.DocumentPath  from ${tables_1.Tables.DOCUMENT} AS d Inner join ${tables_1.Tables.DOCUMENTTYPE} AS dt WHERE dt.Id = d.DocumentTypeId AND  d.isDeleted = 0`;
            ;
            const totalItems = yield My.query(query);
            response = {
                "totalItems": totalItems.length,
                "items": totalItems
            };
            return response;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.DOCUMENT, { isDeleted: 1 }, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.DocumentUtils = DocumentUtils;
//# sourceMappingURL=DocumentUtils.js.map