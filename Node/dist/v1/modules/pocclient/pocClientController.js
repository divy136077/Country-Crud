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
exports.PocClientController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const pocClientUtils_1 = require("./pocClientUtils");
const constants_1 = require("../../../config/constants");
class PocClientController {
    constructor() {
        this.pocClientUtils = new pocClientUtils_1.PocClientUtils();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const result = yield this.pocClientUtils.create(payload);
            payload.id = result.insertId;
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("NEW_RECORD_SUCCESS"));
            return res.status(constants_1.Constants.CREATED).json(response);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const result = yield this.pocClientUtils.update(payload, req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocClientUtils.getOne(req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocClientUtils.getAll(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocClientUtils.delete(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocClientUtils.deleteMany(req.body.ids);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocClientUtils.toggleStatus(req.body.ids, req.body.IsActive);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
            }
        });
    }
}
exports.PocClientController = PocClientController;
//# sourceMappingURL=pocClientController.js.map