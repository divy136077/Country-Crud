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
exports.SettingController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const settingUtils_1 = require("./settingUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
const tables_1 = require("../../../config/tables");
const entityName = "Module";
class SettingController {
    constructor() {
        this.settingUtils = new settingUtils_1.SettingUtils();
        this.utils = new utils_1.Utils();
        /**
         * Create new setting
         */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const slug = yield this.utils.slug(payload.name, 'slug', null, tables_1.Tables.SETTING);
            payload.slug = slug;
            payload.created_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.settingUtils.create(payload);
            payload.id = result.insertId;
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("ADDED_SUCCESS", { entityName }));
            res.status(constants_1.Constants.CREATED).json(response);
        });
        /**
         * Update existing record
         */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            payload.updated_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.settingUtils.update(payload, req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Fetch single record by id
         */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.settingUtils.getOne(req.params.id);
            if (result) {
                result[0].value = result[0].value.toString();
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result[0], req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        /**
         * Fetch all the records
         */
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.settingUtils.getAll(req.body);
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
            res.status(constants_1.Constants.OK).json(response);
        });
        /**
         * Single delete
         */
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.settingUtils.delete(req.params.id, user_id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Multiple delete
         */
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.settingUtils.deleteMany(req.body.ids, user_id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Toggle status from Active/Inactive
         */
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.settingUtils.toggleStatus(req.body.ids, req.body.status, user_id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Encrypt existing user data
         */
        this.encryptUserData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.settingUtils.updateExistingData();
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage("SUCCESS"));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest("FAILED"));
            }
        });
    }
}
exports.SettingController = SettingController;
//# sourceMappingURL=settingController.js.map