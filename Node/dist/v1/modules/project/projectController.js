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
exports.ProjectController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const projectUtils_1 = require("./projectUtils");
class ProjectController {
    constructor() {
        this.ProjectUtils = new projectUtils_1.ProjectUtils();
        //insert company
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            try {
                const projectDetails = JSON.parse(req.body.allData);
                // const companyDetails = req.body.PocProject
                const result = yield this.ProjectUtils.create(projectDetails, req);
                console.log("result", result);
                res.json(result);
            }
            catch (error) {
                res.json(error);
                throw responseBuilder_1.ResponseBuilder.error(error);
            }
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=projectController.js.map