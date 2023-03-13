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
exports.ClientGroupController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const ClientGroupUtils_1 = require("./ClientGroupUtils");
const constants_1 = require("../../../config/constants");
class ClientGroupController {
    constructor() {
        this.clientgroupUtils = new ClientGroupUtils_1.ClientGroupUtils();
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clientgroupUtils.getOne(req.params.id);
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
exports.ClientGroupController = ClientGroupController;
//# sourceMappingURL=ClientGroupController.js.map