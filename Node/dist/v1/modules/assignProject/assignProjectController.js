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
exports.AssignProjectController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const assignProjectUtils_1 = require("./assignProjectUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
class AssignProjectController {
    constructor() {
        this.assignProjectUtils = new assignProjectUtils_1.AssignProjectUtils();
        this.utils = new utils_1.Utils();
        /* To create new menu */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var assignData = yield this.assignProjectUtils.create(Object.assign({}, req.body));
            return res
                .status(200)
                .json({ message: "Assign project data created successfully", data: assignData });
        });
        /* To get single record */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.assignProjectUtils.getOne(req.params.id);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.AssignProjectController = AssignProjectController;
//# sourceMappingURL=assignProjectController.js.map