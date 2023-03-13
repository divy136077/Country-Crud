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
exports.MenusController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const menusUtils_1 = require("./menusUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
class MenusController {
    constructor() {
        this.menusUtils = new menusUtils_1.MenusUtils();
        this.utils = new utils_1.Utils();
        /* To create new menu */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            if (payload.module_id == "" || !payload.module_id || payload.module_id == undefined) {
                const slug = yield this.menusUtils.slug(payload.name, 'slug', null, null);
                payload.slug = slug;
            }
            const user_id = yield this.utils.authToken(req.headers.authorization);
            payload.created_by = user_id;
            const result = yield this.menusUtils.create(payload);
            payload.id = result.insertId;
            return res.status(constants_1.Constants.CREATED).json(responseBuilder_1.ResponseBuilder.data(payload));
        });
        /* To update new menu */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const user_id = yield this.utils.authToken(req.headers.authorization);
            payload.updated_by = user_id;
            const result = yield this.menusUtils.update(payload, req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
            }
        });
        /* To get single record */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.menusUtils.getOne(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /** Get all the multiple records */
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.menusUtils.getAll(req.body);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /* Single delete */
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.menusUtils.delete(req.params.id, user_id);
            console.log('222', user_id, result);
            var isDependent = req.t("DELETE_RECORD_SUCCESS");
            console.log('223', isDependent);
            if (result) {
                if (req.body.isDependent) {
                    isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
                }
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
                // return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")+isDependent));
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
        /* Multiple delete */
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.menusUtils.deleteMany(req.body.ids, user_id);
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
        /* Toggle status from Active/Inactive */
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.menusUtils.toggleStatus(req.body.ids, req.body.status, user_id);
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
        /** To get sidebar menu */
        this.getBackendMenu = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.menusUtils.getBackendMenu(req);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.MenusController = MenusController;
//# sourceMappingURL=menusController.js.map