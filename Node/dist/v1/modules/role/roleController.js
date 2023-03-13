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
exports.RoleController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const roleUtils_1 = require("./roleUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
class RoleController {
    constructor() {
        this.roleUtils = new roleUtils_1.RoleUtils();
        this.utils = new utils_1.Utils();
        /**Create a new role*/
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req.body;
                const user_id = yield this.utils.authToken(req.headers.authorization);
                payload.created_by = user_id;
                const portal_id = payload.portal_id;
                const result = yield this.roleUtils.create(payload);
                payload.id = payload.role_id = result.insertId;
                payload.portal_id = portal_id;
                const role_portal_mapping = yield this.roleUtils.create_role_portal_mapping(payload);
                return res.status(constants_1.Constants.CREATED).json(responseBuilder_1.ResponseBuilder.data(payload));
            }
            catch (error) {
                console.log('45', "portal exist");
            }
        });
        /** Update existing record*/
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            input.updated_by = user_id;
            const portal_id = input.portal_id;
            const result = yield this.roleUtils.update(input, req.params.id);
            input.portal_id = portal_id;
            const role_portal_mapping = yield this.roleUtils.update_role_portal_mapping(input, req.params.id);
            // rabbit.publishToQueue(
            //   process.env.MS_QUEUE_NAME_ROLE_UPDATE,
            //   JSON.stringify({
            //     id: req.params.id,
            //     data: input,
            //   })
            // );
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
            }
        });
        /** Fetch single record*/
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.roleUtils.getOne(req.params.id);
            // console.log(result);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Fetch multiple records*/
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.roleUtils.getAll(req.body);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Single delete*/
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.roleUtils.delete(req.params.id, user_id);
            var isDependent = req.t("DELETE_RECORD_SUCCESS");
            if (result) {
                if (req.body.isDependent) {
                    isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
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
        /** Multiple delete*/
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.roleUtils.deleteMany(req.body.ids, user_id);
            var isDependent = "";
            if (result) {
                if (req.body.isDependent) {
                    isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent));
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
            const result = yield this.roleUtils.toggleStatus(req.body.ids, req.body.status, user_id);
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
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=roleController.js.map