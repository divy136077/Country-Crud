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
exports.ClientController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
const ClientUtils_1 = require("./ClientUtils");
const bcrypt = require('bcryptjs');
class ClientController {
    constructor() {
        this.clientUtils = new ClientUtils_1.ClientUtils();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var file = req.file;
            var input = req.body;
            console.log(input);
            console.log(file);
            const result = yield this.clientUtils.AddNewClient(input);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage("Record added successfully!"));
            }
            return res.status(constants_1.Constants.INTERNAL_SERVER).json(responseBuilder_1.ResponseBuilder.errorMessage("Something went wrong!"));
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clientUtils.getOne(req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        this.getClientGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clientUtils.ClientGroupList();
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map