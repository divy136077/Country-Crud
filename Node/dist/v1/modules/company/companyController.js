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
exports.CompanyController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const companyUtils_1 = require("./companyUtils");
class CompanyController {
    constructor() {
        this.companyUtils = new companyUtils_1.CompanyUtils();
        //get all company data
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('controller called');
                const result = yield this.companyUtils.getAll(req);
                console.log(result);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
        //get single company
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.companyUtils.getOne(id, req);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
        //insert company
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const companyDetails = req.body;
                const result = yield this.companyUtils.create(companyDetails, req);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
        //update company 
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const companyDetails = req.body;
                console.log('companyDetails', companyDetails);
                const id = req.params.id;
                console.log(id);
                const result = yield this.companyUtils.update(companyDetails, id, req);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
        //inactive company
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("body", req.body);
                const id = req.body.companyId;
                const result = yield this.companyUtils.toggleStatus(id, req);
                console.log("result = ", result);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.companyUtils.delete(id, req);
                console.log("result = ", result);
                res.json(result);
            }
            catch (error) {
            }
        });
        this.getCompanyList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                // console.log(id)
                const result = yield this.companyUtils.getCompanyList(id);
                // console.log("result = ", result)
                res.json(result);
            }
            catch (error) {
            }
        });
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=companyController.js.map