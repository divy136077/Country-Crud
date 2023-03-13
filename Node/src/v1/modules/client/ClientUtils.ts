import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";


export class ClientUtils {

    public async AddNewClient(input: any) {

        let clientGroup = input.clientGroup;
        let company = input.companySetup;
        let invoiceDetail = input.invoiceDetail;
        let poc = input.poc;
        let POCIds = input.POCIds;
        let document = input.document;
        let DocumentIds = input.DocumentIds;
        company['ClientGroupId'] = input.ClientGroupId ?? "";

        if (!input.ClientGroupId) {
            const addClientGroup = await My.insert(Tables.CLIENTGROUP, clientGroup);

            company['ClientGroupId'] = addClientGroup.insertId;

            if (POCIds.length > 0) {
                const updatePOC = await My.update(Tables.POCCLIENT, { ClientGroupId: addClientGroup.insertId }, `id IN(${POCIds.join(', ')})`);
            }
            else {
                poc['ClientGroupId'] = addClientGroup.insertId;
                const addPOC = await My.insert(Tables.POCCLIENT, poc);
            }
        }

        const addCompany = await My.insert(Tables.COMPANY, company);
    

        invoiceDetail['CompanyId'] = addCompany.insertId;
        const addInvoiceDetail = await My.insert(Tables.INVOICEDETAIL, invoiceDetail);

        if (DocumentIds.length > 0) {
            const updateDocument = await My.update(Tables.DOCUMENT, { CompanyId: addCompany.insertId }, `id IN(${DocumentIds.join(', ')})`);
        }
        else {
            console.log(addCompany.insertId)
            const addDocument = await My.insert(Tables.DOCUMENT, { CompanyId: addCompany.insertId }, document);
        }

        return true;
    }


    public async getOne(id: number) {
        let query = `SELECT ClientGroup AS group_name ,PersonName AS contact_person_name,Email AS email,PhoneNo AS contact_number,P.Name AS account_priority,P.Id AS PId,S.Name AS significance, S.Id AS SId,G.Name AS governance_management, G.Id AS GId,AM.Name AS account_manager, AM.Id AS AId, BDM.Name AS bdm_name,BDM.Id AS BdmId FROM ${Tables.CLIENTGROUP} AS CG INNER JOIN ${Tables.PRIORITY} AS P ON P.Id = CG.PriorityId INNER JOIN ${Tables.SIGNIFICANCE} AS S ON S.Id = CG.SignificanceId INNER JOIN ${Tables.GOVERNANCEMANAGEMENT} AS G ON G.Id = CG.GovernanceManagementId INNER JOIN ${Tables.ACCOUNTMANAGER} AS AM ON AM.Id = CG.AccountManagerId INNER JOIN ${Tables.BDM} AS BDM ON BDM.Id = CG.BDMId WHERE CG.Id = ${id} AND CG.IsActive = 1 AND CG.IsDeleted=0`;

        const totalItems = await My.query(query);

        return totalItems;
    }

    public async ClientGroupList() {
        let query = `SELECT ClientGroup AS group_name ,PersonName AS contact_person_name, P.Name AS account_priority, AM.Name AS account_manager, CG.Id AS ClientGroupId, C.CompanyId AS CompanyId, I.Name AS IndustryName FROM ${Tables.CLIENTGROUP} AS CG 
        INNER JOIN ${Tables.PRIORITY} AS P ON P.Id = CG.PriorityId 
        INNER JOIN ${Tables.COMPANY} AS C ON C.ClientGroupId = CG.Id 
        INNER JOIN ${Tables.INDUSTRY} AS I ON I.Id = C.IndustryId 
        INNER JOIN ${Tables.ACCOUNTMANAGER} AS AM ON AM.Id = CG.AccountManagerId WHERE CG.IsActive = 1 AND CG.IsDeleted=0`;

        const totalItems = await My.query(query);

        return totalItems;
    }

}