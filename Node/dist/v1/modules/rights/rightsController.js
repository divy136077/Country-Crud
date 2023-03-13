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
exports.RightsController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const rightsUtils_1 = require("./rightsUtils");
const constants_1 = require("../../../config/constants");
const moduleUtils_1 = require("../module/moduleUtils");
const utils_1 = require("../../../helpers/utils");
class RightsController {
    constructor() {
        this.rightsUtils = new rightsUtils_1.RightsUtils();
        this.moduleUtils = new moduleUtils_1.ModuleUtils();
        this.utils = new utils_1.Utils();
        /** Create rights */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const moduleName = yield this.moduleUtils.getOne(payload.module_id);
            let slugName = moduleName ? moduleName.slug + '/' + payload.name : payload.name;
            const slug = yield this.rightsUtils.slug(slugName, 'slug', null, null);
            payload.slug = slug;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            payload.created_by = user_id;
            const result = yield this.rightsUtils.create(payload);
            payload.id = result.insertId;
            return res.status(constants_1.Constants.CREATED).json(responseBuilder_1.ResponseBuilder.data(payload));
        });
        /** Update existing rights */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            input.updated_by = user_id;
            const result = yield this.rightsUtils.update(input, req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
            }
        });
        /** Fetch single record */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rightsUtils.getOne(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Fetch multiple records */
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rightsUtils.getAll(req.body);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Single delete*/
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.rightsUtils.delete(req.params.id, user_id);
            var isDependent = req.t("DELETE_RECORD_SUCCESS");
            if (result) {
                if (req.body.isDependent) {
                    isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(isDependent));
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
        /** Multiple delete */
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.rightsUtils.deleteMany(req.body.ids, user_id);
            if (result) {
                if (req.body.isDependent) {
                    return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + " But " + req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                else {
                    return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
                }
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
            const result = yield this.rightsUtils.toggleStatus(req.body.ids, req.body.status, user_id);
            if (result) {
                if (req.body.isDependent) {
                    return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS") + " But " + req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                else {
                    return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS")));
                }
            }
            else {
                if (req.body.isDependent) {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
                }
                else {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));
                }
            }
        });
    }
}
exports.RightsController = RightsController;
//# sourceMappingURL=rightsController.js.map