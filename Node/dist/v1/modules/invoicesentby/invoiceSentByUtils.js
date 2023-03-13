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
exports.InvoiceSentByUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class InvoiceSentByUtils {
    getAllInvoiceSentBy() {
        return __awaiter(this, void 0, void 0, function* () {
            // query
            let query = `SELECT * from ${tables_1.Tables.INVOICESENTBY} WHERE IsActive = 1 AND IsDeleted=0`;
            const totalItems = yield My.query(query);
            return totalItems;
        });
    }
}
exports.InvoiceSentByUtils = InvoiceSentByUtils;
//# sourceMappingURL=invoiceSentByUtils.js.map