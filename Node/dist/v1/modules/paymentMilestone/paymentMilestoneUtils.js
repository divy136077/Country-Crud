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
exports.PocProjectUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class PocProjectUtils {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = input.PaymentMilestone;
            return yield My.insert(tables_1.Tables.PAYMENT_MILESTONE, data);
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = input.PaymentMilestone;
            const rights = yield My.updateFirst(tables_1.Tables.PAYMENT_MILESTONE, data, `id = ?`, [id]);
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
            return yield My.first(tables_1.Tables.PAYMENT_MILESTONE, ["*"], "id = ? ", [id]);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // query
            let query = `SELECT * from ${tables_1.Tables.PAYMENT_MILESTONE} WHERE IsActive = 1 AND IsDeleted=0`;
            const totalItems = yield My.query(query);
            return totalItems;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.PAYMENT_MILESTONE, { IsDeleted: 1 }, `id = ?`, [id]);
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
            console.log("ids", ids);
            const rights = yield My.query(`UPDATE ${tables_1.Tables.PAYMENT_MILESTONE} SET IsDeleted = 1 WHERE id in (${ids})`);
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
            const rights = yield My.query(`UPDATE ${tables_1.Tables.PAYMENT_MILESTONE} SET IsActive = ${status} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.PocProjectUtils = PocProjectUtils;
//# sourceMappingURL=paymentMilestoneUtils.js.map