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
exports.CompanyMiddleware = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
const Sql = require("jm-ez-mysql");
class CompanyMiddleware {
    constructor() {
        this.IsCompanyExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const gotId = yield Sql.query(`select * from Company where CompanyId = ${req.params.id}`);
            if (gotId == "") {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_NOT_EXISTS")));
            }
            else {
                next();
            }
        });
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("company middleware =", req.params.id);
            if (isNaN(req.params.id)) {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID")));
            }
            else {
                next();
            }
        });
    }
}
exports.CompanyMiddleware = CompanyMiddleware;
//# sourceMappingURL=companyMiddleware.js.map