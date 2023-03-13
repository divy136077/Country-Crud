import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Utils } from "../../../helpers/utils";


export class CompanyUtils {

    //get all company data
    public async getAll(req): Promise<ResponseBuilder> {
        const data = await Sql.query("SELECT * FROM " + Tables.COMPANY_DETAILS);

        return ResponseBuilder.data(data, req.t("BULK_IMPORT_SUCCESS"));
    }


    //insert company data
    public async create(companyDetails, req): Promise<ResponseBuilder> {

        const createdDate = new Date().toISOString().split('T')[0] + " " + new Date().toTimeString()
        console.log('current = ', createdDate)

        const data = await Sql.query(`INSERT INTO Company (ClientGroupId,OverseasId,PriorityId,SectorId,CountryType,GeographyId,CountryId,StateId,IndustryId,EngagementMonthYear,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,IsActive,IsDeleted) VALUES ('${companyDetails.ClientGroupId}','${companyDetails.OverseasId}', '${companyDetails.PriorityId}', '${companyDetails.SectorId}', '${companyDetails.CountryType}', '${companyDetails.GeographyId}', '${companyDetails.CountryId}', '${companyDetails.StateId}', '${companyDetails.IndustryId}', '${companyDetails.EngagementMonthYear}',  '${createdDate}', '${companyDetails.CreatedBy}', '${createdDate}','${companyDetails.ModifiedBy}', 1, 0);`);
        // const data = await Sql.insert(Tables.COMPANY_DETAILS, companyDetails);

        return ResponseBuilder.data(data, req.t("NEW_RECORD_SUCCESS"))
    }


    //update company data
    public async update(companyDetails, companyID, req) {

        const createdDate = new Date().toISOString().split('T')[0] + " " + new Date().toTimeString()

        console.log('current = ', createdDate)

        const id = companyID
        // const gotId = await Sql.query(`select * from Company where CompanyId = ${id}`)
        // console.log("got", gotId)


        if (id) {
            const data = await Sql.query(`update Company set ClientGroupId= ? ,OverseasId= ? ,PriorityId= ? ,SectorId= ? ,CountryType= ? ,GeographyId= ? ,CountryId= ? ,StateId= ? ,IndustryId= ? ,EngagementMonthYear= ? ,ModifiedDate= ? ,ModifiedBy= ? where CompanyId = ${id}`, [companyDetails.ClientGroupId, companyDetails.OverseasId, companyDetails.PriorityId, companyDetails.SectorId, companyDetails.CountryType, companyDetails.GeographyId, companyDetails.CountryId, companyDetails.StateId, companyDetails.IndustryId, companyDetails.EngagementMonthYear, createdDate, companyDetails.ModifiedBy])

            return ResponseBuilder.data(data, req.t("UPDATE_RECORD_SUCCESS"))
        }
        else {
            return ResponseBuilder.badRequest(req.t("INVAILD_ID"));

        }

    }

    //get single company data
    public async getOne(id, req) {
        const data = await Sql.query(`select * from Company where CompanyId= ${id}`)
        console.log(data)
        console.log("data = ", data)
        if (data) {

            return ResponseBuilder.data(data, req.t("BULK_IMPORT_SUCCESS"))
        }
        else {
            return ResponseBuilder.badRequest("User not exists")
        }
    }


    //inactive company
    public async toggleStatus(id, req) {
        const findIsActive = await Sql.query(`select IsActive from Company where CompanyId= ${id} AND IsActive=1 `)

        console.log("findactive", findIsActive)

        if (findIsActive != "") {
            const data = await Sql.query(`update Company set IsActive=0 where CompanyId = ${id}`)
            console.log("datainactive", data)
            return ResponseBuilder.data(data, req.t("UPDATE_STATUS_SUCCESS"))
        }
        else {
            const data = await Sql.query(`update Company set IsActive=1 where CompanyId = ${id}`)
            console.log("data active", data)
            return ResponseBuilder.data(data, req.t("UPDATE_STATUS_SUCCESS"))
        }
    }


    //delete company
    public async delete(id, req) {
        const findDelete = await Sql.query(`select IsDeleted from Company where CompanyId= ${id} AND IsDeleted=0 `)

        console.log("findactive", findDelete)

        if (findDelete) {

            const data = await Sql.query(`update Company set IsDeleted=1 where CompanyId = ${id}`)
            console.log("datainactive", data)
            return ResponseBuilder.data(data, req.t("DELETE_RECORD_SUCCESS"))
        }
        else {
            return ResponseBuilder.badRequest(req.t("INVAILD_ID"))
        }
    }



    public async getCompanyList(id:any) {

        

        const rights = `SELECT CompanyId AS cId, CompanyName AS cName, S.Name AS sectorName,S.Id AS sectorId, O.Name AS overseas,O.Id AS overseasId, Cou.Name AS country, Cou.Id AS countryId, Sta.Name AS state, Sta.Id AS stateId,I.Name AS industry,I.Id AS industryId
        FROM ${Tables.COMPANY_DETAILS} AS C
        INNER JOIN ${Tables.SECTOR} AS S ON S.Id = C.SectorId
        INNER JOIN ${Tables.DOMESTIC} AS O ON O.Id = C.OverseasId
        INNER JOIN ${Tables.COUNTRY} AS Cou ON Cou.Id = C.CountryId
        INNER JOIN ${Tables.STATE} AS Sta ON Sta.Id = C.StateId
        INNER JOIN ${Tables.CLIENTGROUP} AS CG ON CG.Id = C.ClientGroupId
        INNER JOIN ${Tables.INDUSTRY} AS I ON I.Id = C.IndustryId
        WHERE CG.Id = ${id} AND C.IsActive = 1 AND C.IsDeleted = 0`
        const totalItems = await Sql.query(rights);
        // console.log(totalItems)

        return totalItems;
    }


}