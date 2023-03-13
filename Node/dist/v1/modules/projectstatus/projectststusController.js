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
exports.ProjectStatusController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const projectstatusUtils_1 = require("./projectstatusUtils");
const constants_1 = require("../../../config/constants");
class ProjectStatusController {
    constructor() {
        this.projectStatusUtils = new projectstatusUtils_1.ProjectStatusUtils();
        this.getAllStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.projectStatusUtils.getAllStatus();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.ProjectStatusController = ProjectStatusController;
//# sourceMappingURL=projectststusController.js.map