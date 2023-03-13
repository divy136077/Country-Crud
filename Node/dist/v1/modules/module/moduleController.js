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
exports.ModuleController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const moduleUtils_1 = require("./moduleUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
const tables_1 = require("../../../config/tables");
class ModuleController {
    constructor() {
        this.moduleUtils = new moduleUtils_1.ModuleUtils();
        this.utils = new utils_1.Utils();
        /**Create new record */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const slug = yield this.utils.slug(payload.name, 'slug', null, tables_1.Tables.MODULES);
            payload.slug = slug;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            payload.created_by = user_id;
            const result = yield this.moduleUtils.create(payload);
            payload.id = result.insertId;
            return res.status(constants_1.Constants.CREATED).json(responseBuilder_1.ResponseBuilder.data(payload));
        });
        /** Update existing record */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            payload.updated_by = user_id;
            const result = yield this.moduleUtils.update(payload, req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
            }
        });
        /** Get single record based on id */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.moduleUtils.getOne(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Get multiple records*/
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.moduleUtils.getAll(req.body);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Single delete */
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.moduleUtils.delete(req.params.id, user_id);
            console.log('111', user_id, result);
            var isDependent = req.t("DELETE_RECORD_SUCCESS");
            if (result) {
                console.log('112', req.body.isDependent);
                if (req.body.isDependent) {
                    isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
                // return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent));
            }
            else {
                if (req.body.isDependent) {
                    console.log('113', req.body.isDependent);
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                else {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
                }
            }
        });
        /** Multiple delete */
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.moduleUtils.deleteMany(req.body.ids, user_id);
            console.log('115', result);
            var isDependent = "";
            // if (result) {
            //   console.log('118', req.body)
            //   if (req.body.isDependent) {
            //     console.log('117', req.body.isDependent)
            //     // isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
            //     return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
            //   }
            //   // return res.json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent))
            //   return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent));
            // } else {
            //   console.log('119', !req.body.isDependent)
            //   if (!req.body.isDependent) {
            //     console.log('120', !req.body.isDependent)
            //     return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent))
            //     // return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
            //   } else {
            //     return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
            //   }
            // }
            if (result) {
                console.log('118', req.body);
                if (req.body.isDependent) {
                    console.log('117', req.body.isDependent);
                    // isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
                    // return res.json({dependacyResponse: true})
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent));
            }
            else {
                if (req.body.isDependent) {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                else {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
                }
            }
        });
        /** Toggle status from Active/Inactive*/
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.moduleUtils.toggleStatus(req.body.ids, req.body.status, user_id);
            var isDependent = "";
            if (result) {
                if (req.body.isDependent) {
                    isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS") + isDependent));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));
            }
        });
        /** Trucate table */
        this.truncateACL = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.moduleUtils.truncateACL();
            if (result) {
                return res.status(constants_1.Constants.OK).json({});
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json({});
            }
        });
        /** Fetch single record */
        this.getmodule = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.moduleUtils.getmodule(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.ModuleController = ModuleController;
//# sourceMappingURL=moduleController.js.map