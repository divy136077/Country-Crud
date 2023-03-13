import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class ClientGroupUtils {

    public async getOne(id: number) {

        let query = `SELECT ClientGroup AS group_name ,PersonName  AS contact_person_name,Email AS email,PhoneNo AS contact_number,P.Name AS account_priority,P.Id AS PId,S.Name AS significance, S.Id AS SId,G.Name AS governance_management, G.Id AS GId,AM.Name AS account_manager, AM.Id AS AId,
        BDM.Name AS bdm_name,BDM.Id AS BdmId FROM ${Tables.CLIENTGROUP} AS CG 
        INNER JOIN ${Tables.PRIORITY} AS P ON P.Id = CG.PriorityId
        INNER JOIN ${Tables.SIGNIFICANCE} AS S ON S.Id = CG.SignificanceId
        INNER JOIN ${Tables.GOVERNANCEMANAGEMENT} AS G ON G.Id = CG.GovernanceManagementId
        INNER JOIN ${Tables.ACCOUNTMANAGER} AS AM ON AM.Id = CG.AccountManagerId
        INNER JOIN ${Tables.BDM} AS BDM ON BDM.Id = CG.BDMId
        WHERE CG.Id = ${id} AND CG.IsActive = 1 AND CG.IsDeleted=0`

        const totalItems = await My.query(query);

        return totalItems.length > 0 ? totalItems[0] : null;
    }
}