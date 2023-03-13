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
exports.DocumentController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const DocumentUtils_1 = require("./DocumentUtils");
const constants_1 = require("../../../config/constants");
class DocumentController {
    constructor() {
        this.documentUtils = new DocumentUtils_1.DocumentUtils();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            let payload = req.body;
            payload.DocumentName = req._filedata[0].newFilename;
            payload.DocumentPath = req._filedata[0].path.replace(/^\./, "");
            console.log("ffff", payload);
            const result = yield this.documentUtils.create(payload);
            payload.id = result.insertId;
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("NEW_RECORD_SUCCESS"));
            res.status(constants_1.Constants.CREATED).json(response);
            // return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.documentUtils.getOne(req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.documentUtils.getAll(req.body);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.documentUtils.delete(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
    }
}
exports.DocumentController = DocumentController;
//# sourceMappingURL=DocumentController.js.map