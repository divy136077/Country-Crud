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
exports.PocProjectController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const pocProjectUtils_1 = require("./pocProjectUtils");
const constants_1 = require("../../../config/constants");
class PocProjectController {
    constructor() {
        this.pocProjectUtils = new pocProjectUtils_1.PocProjectUtils();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const result = yield this.pocProjectUtils.create(payload);
            payload.id = result.insertId;
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("NEW_RECORD_SUCCESS"));
            res.status(constants_1.Constants.CREATED).json(response);
            // return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const result = yield this.pocProjectUtils.update(payload, req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.getOne(req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.getAll();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.delete(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.deleteMany(req.body.ids);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.toggleStatus(req.body.ids, req.body.IsActive);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
            }
        });
        // public PocNamefromPocClient = async (req: any, res: Response) => {
        //   console.log(req.body)
        //   const result = await this.pocProjectUtils.PocNamefromPocClient(req.body.POCTypeId);
        //   console.log('2',result)
        //   if (result) {
        //     return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse(result, req.t("UPDATE_STATUS_SUCCESS")));
        //   } else {
        //     return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
        //   }
        // }
        this.getPOCName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pocProjectUtils.getPOCName();
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("UPDATE_STATUS_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
            }
        });
    }
}
exports.PocProjectController = PocProjectController;
//# sourceMappingURL=pocProjectController.js.map