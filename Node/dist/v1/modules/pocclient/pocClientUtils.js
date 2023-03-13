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
exports.PocClientUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class PocClientUtils {
    constructor() {
        this.poc = [];
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(input);
            const poc = yield My.insert(tables_1.Tables.POCCLIENT, input);
            const pocData = yield this.getOne(poc.insertId);
            return pocData;
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = yield My.updateFirst(tables_1.Tables.POCCLIENT, input, `id = ?`, [id]);
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
            let query = `SELECT pt.Name,pt.Id,p.IsActive,pt.Id AS PocTypeId,p.ClientGroupId,p.Email,p.Designation, p.PhoneNo,p.PocName  from ${tables_1.Tables.POCCLIENT} AS p Inner join ${tables_1.Tables.POCTYPE} AS pt on pt.Id = p.POCTypeId  WHERE  p.Id=${id}`;
            const totalItems = yield My.query(query);
            return totalItems;
        });
    }
    getAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let query = `SELECT pt.Name,p.IsActive,pt.Id AS PocTypeId,p.id,p.Email,p.Designation, p.PhoneNo,p.PocName  from ${tables_1.Tables.POCCLIENT} AS p Inner join ${tables_1.Tables.POCTYPE} AS pt on pt.Id = p.POCTypeId  INNER JOIN ${tables_1.Tables.CLIENTGROUP} AS cg ON cg.Id = p.ClientGroupId WHERE cg.Id = ${id} AND p.IsDeleted=0`;
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
            const rights = yield My.updateFirst(tables_1.Tables.POCCLIENT, { IsDeleted: 1 }, `id = ?`, [id]);
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
            const rights = yield My.query(`UPDATE ${tables_1.Tables.POCCLIENT} SET IsDeleted = 1 WHERE id in (${ids})`);
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
            const rights = yield My.query(`UPDATE ${tables_1.Tables.POCCLIENT} SET IsActive = ${status} WHERE id in (${ids})`);
            if (rights.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.PocClientUtils = PocClientUtils;
//# sourceMappingURL=pocClientUtils.js.map