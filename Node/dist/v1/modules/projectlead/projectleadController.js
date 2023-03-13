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
exports.ProjectLeadController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const projectleadUtils_1 = require("./projectleadUtils");
const constants_1 = require("../../../config/constants");
class ProjectLeadController {
    constructor() {
        this.projectLeadUtils = new projectleadUtils_1.ProjectLeadUtils();
        this.getAllLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.projectLeadUtils.getAllLead();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.ProjectLeadController = ProjectLeadController;
//# sourceMappingURL=projectleadController.js.map