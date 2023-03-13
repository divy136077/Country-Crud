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
            const data = input.PocProject;
            console.log('data= ', data);
            return yield My.insert(tables_1.Tables.POCPROJECT, data);
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = input.PocProject;
            const rights = yield My.updateFirst(tables_1.Tables.POCPROJECT, data, `id = ?`, [id]);
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
            return yield My.first(tables_1.Tables.POCPROJECT, ["*"], "id = ? ", [id]);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // query
            let query = `SELECT * from ${tables_1.Tables.POCPROJECT} WHERE IsActive = 1 AND IsDeleted=0`;
            const totalItems = yield My.query(query);
            return totalItems;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.POCPROJECT, { IsDeleted: 1 }, `id = ?`, [id]);
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
            const rights = yield My.query(`UPDATE ${tables_1.Tables.POCPROJECT} SET IsDeleted = 1 WHERE id in (${ids})`);
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
            const rights = yield My.query(`UPDATE ${tables_1.Tables.POCPROJECT} SET IsActive = ${status} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    getPOCName() {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = `SELECT POCc.Id,POCc.POCName FROM ${tables_1.Tables.POCCLIENT} as POCc INNER JOIN ${tables_1.Tables.POCTYPE} as POCt ON POCt.Id = POCc.POCTypeId WHERE POCt.Name = "Project" AND POCc.IsActive = 1`;
            const totalItems = yield My.query(rights);
            // console.log(totalItems)
            return totalItems;
        });
    }
}
exports.PocProjectUtils = PocProjectUtils;
//# sourceMappingURL=pocProjectUtils.js.map