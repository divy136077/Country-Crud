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
exports.CompanyUtils = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
class CompanyUtils {
    //get all company data
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Sql.query("SELECT * FROM " + tables_1.Tables.COMPANY_DETAILS);
            return responseBuilder_1.ResponseBuilder.data(data, req.t("BULK_IMPORT_SUCCESS"));
        });
    }
    //insert company data
    create(companyDetails, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdDate = new Date().toISOString().split('T')[0] + " " + new Date().toTimeString();
            console.log('current = ', createdDate);
            const data = yield Sql.query(`INSERT INTO Company (ClientGroupId,OverseasId,PriorityId,SectorId,CountryType,GeographyId,CountryId,StateId,IndustryId,EngagementMonthYear,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,IsActive,IsDeleted) VALUES ('${companyDetails.ClientGroupId}','${companyDetails.OverseasId}', '${companyDetails.PriorityId}', '${companyDetails.SectorId}', '${companyDetails.CountryType}', '${companyDetails.GeographyId}', '${companyDetails.CountryId}', '${companyDetails.StateId}', '${companyDetails.IndustryId}', '${companyDetails.EngagementMonthYear}',  '${createdDate}', '${companyDetails.CreatedBy}', '${createdDate}','${companyDetails.ModifiedBy}', 1, 0);`);
            // const data = await Sql.insert(Tables.COMPANY_DETAILS, companyDetails);
            return responseBuilder_1.ResponseBuilder.data(data, req.t("NEW_RECORD_SUCCESS"));
        });
    }
    //update company data
    update(companyDetails, companyID, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdDate = new Date().toISOString().split('T')[0] + " " + new Date().toTimeString();
            console.log('current = ', createdDate);
            const id = companyID;
            // const gotId = await Sql.query(`select * from Company where CompanyId = ${id}`)
            // console.log("got", gotId)
            if (id) {
                const data = yield Sql.query(`update Company set ClientGroupId= ? ,OverseasId= ? ,PriorityId= ? ,SectorId= ? ,CountryType= ? ,GeographyId= ? ,CountryId= ? ,StateId= ? ,IndustryId= ? ,EngagementMonthYear= ? ,ModifiedDate= ? ,ModifiedBy= ? where CompanyId = ${id}`, [companyDetails.ClientGroupId, companyDetails.OverseasId, companyDetails.PriorityId, companyDetails.SectorId, companyDetails.CountryType, companyDetails.GeographyId, companyDetails.CountryId, companyDetails.StateId, companyDetails.IndustryId, companyDetails.EngagementMonthYear, createdDate, companyDetails.ModifiedBy]);
                return responseBuilder_1.ResponseBuilder.data(data, req.t("UPDATE_RECORD_SUCCESS"));
            }
            else {
                return responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID"));
            }
        });
    }
    //get single company data
    getOne(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Sql.query(`select * from Company where CompanyId= ${id}`);
            console.log(data);
            console.log("data = ", data);
            if (data) {
                return responseBuilder_1.ResponseBuilder.data(data, req.t("BULK_IMPORT_SUCCESS"));
            }
            else {
                return responseBuilder_1.ResponseBuilder.badRequest("User not exists");
            }
        });
    }
    //inactive company
    toggleStatus(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIsActive = yield Sql.query(`select IsActive from Company where CompanyId= ${id} AND IsActive=1 `);
            console.log("findactive", findIsActive);
            if (findIsActive != "") {
                const data = yield Sql.query(`update Company set IsActive=0 where CompanyId = ${id}`);
                console.log("datainactive", data);
                return responseBuilder_1.ResponseBuilder.data(data, req.t("UPDATE_STATUS_SUCCESS"));
            }
            else {
                const data = yield Sql.query(`update Company set IsActive=1 where CompanyId = ${id}`);
                console.log("data active", data);
                return responseBuilder_1.ResponseBuilder.data(data, req.t("UPDATE_STATUS_SUCCESS"));
            }
        });
    }
    //delete company
    delete(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const findDelete = yield Sql.query(`select IsDeleted from Company where CompanyId= ${id} AND IsDeleted=0 `);
            console.log("findactive", findDelete);
            if (findDelete) {
                const data = yield Sql.query(`update Company set IsDeleted=1 where CompanyId = ${id}`);
                console.log("datainactive", data);
                return responseBuilder_1.ResponseBuilder.data(data, req.t("DELETE_RECORD_SUCCESS"));
            }
            else {
                return responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID"));
            }
        });
    }
    getCompanyList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rights = `SELECT CompanyId AS cId, CompanyName AS cName, S.Name AS sectorName,S.Id AS sectorId, O.Name AS overseas,O.Id AS overseasId, Cou.Name AS country, Cou.Id AS countryId, Sta.Name AS state, Sta.Id AS stateId,I.Name AS industry,I.Id AS industryId
        FROM ${tables_1.Tables.COMPANY_DETAILS} AS C
        INNER JOIN ${tables_1.Tables.SECTOR} AS S ON S.Id = C.SectorId
        INNER JOIN ${tables_1.Tables.DOMESTIC} AS O ON O.Id = C.OverseasId
        INNER JOIN ${tables_1.Tables.COUNTRY} AS Cou ON Cou.Id = C.CountryId
        INNER JOIN ${tables_1.Tables.STATE} AS Sta ON Sta.Id = C.StateId
        INNER JOIN ${tables_1.Tables.CLIENTGROUP} AS CG ON CG.Id = C.ClientGroupId
        INNER JOIN ${tables_1.Tables.INDUSTRY} AS I ON I.Id = C.IndustryId
        WHERE CG.Id = ${id} AND C.IsActive = 1 AND C.IsDeleted = 0`;
            const totalItems = yield Sql.query(rights);
            // console.log(totalItems)
            return totalItems;
        });
    }
}
exports.CompanyUtils = CompanyUtils;
//# sourceMappingURL=companyUtils.js.map