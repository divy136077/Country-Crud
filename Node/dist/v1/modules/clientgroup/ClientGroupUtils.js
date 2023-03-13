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
exports.ClientGroupUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class ClientGroupUtils {
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT ClientGroup AS group_name ,PersonName  AS contact_person_name,Email AS email,PhoneNo AS contact_number,P.Name AS account_priority,P.Id AS PId,S.Name AS significance, S.Id AS SId,G.Name AS governance_management, G.Id AS GId,AM.Name AS account_manager, AM.Id AS AId,
        BDM.Name AS bdm_name,BDM.Id AS BdmId FROM ${tables_1.Tables.CLIENTGROUP} AS CG 
        INNER JOIN ${tables_1.Tables.PRIORITY} AS P ON P.Id = CG.PriorityId
        INNER JOIN ${tables_1.Tables.SIGNIFICANCE} AS S ON S.Id = CG.SignificanceId
        INNER JOIN ${tables_1.Tables.GOVERNANCEMANAGEMENT} AS G ON G.Id = CG.GovernanceManagementId
        INNER JOIN ${tables_1.Tables.ACCOUNTMANAGER} AS AM ON AM.Id = CG.AccountManagerId
        INNER JOIN ${tables_1.Tables.BDM} AS BDM ON BDM.Id = CG.BDMId
        WHERE CG.Id = ${id} AND CG.IsActive = 1 AND CG.IsDeleted=0`;
            const totalItems = yield My.query(query);
            return totalItems.length > 0 ? totalItems[0] : null;
        });
    }
}
exports.ClientGroupUtils = ClientGroupUtils;
//# sourceMappingURL=ClientGroupUtils.js.map