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
exports.AddUpadateMilestoneUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class AddUpadateMilestoneUtils {
    /**get all Milestone */
    getAllMilestone() {
        return __awaiter(this, void 0, void 0, function* () {
            // let query = `SELECT * from ${Tables.MILESTONE} WHERE IsActive = 1 AND IsDeleted=0`;
            let query = `SELECT mi.Percentage,w.IsActive,mi.Id AS TypeId,w.Id,w.MileStoneName,w.DueDate from ${tables_1.Tables.MILESTONE} AS w Inner join ${tables_1.Tables.PERCENTAGE} AS mi ON mi.Id = w.MileStonePercentageId WHERE w.IsActive=1 AND w.IsDeleted=0`;
            const totalItems = yield My.query(query);
            console.log(totalItems);
            return totalItems;
        });
    }
    /**post api milestone add update part */
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.MILESTONE, input);
        });
    }
    /**edit(update) api milestone add update part */
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.MILESTONE, input, `id = ?`, [id]);
            // return await My.updateFirst(Tables.MILESTONE, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**delete one data api milestone add update */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.MILESTONE, { IsDeleted: 1 }, `id = ?`, [id]);
            if (rights.affectedRows > 0) {
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
            let query = `SELECT mi.Percentage,w.IsActive,mi.Id AS TypeId,w.Id,w.MileStoneName,w.DueDate from ${tables_1.Tables.MILESTONE} AS w Inner join ${tables_1.Tables.PERCENTAGE} AS mi ON mi.Id = w.MileStonePercentageId WHERE w.Id=${id}`;
            const totalItems = yield My.query(query);
            console.log(totalItems);
            return totalItems;
            // return await My.first(Tables.MILESTONE, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
        });
    }
    /**to status change */
    toggleStatus(ids, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.query(`UPDATE ${tables_1.Tables.MILESTONE} SET IsActive = ${status} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.AddUpadateMilestoneUtils = AddUpadateMilestoneUtils;
//# sourceMappingURL=addupdatemilestoneUtils.js.map