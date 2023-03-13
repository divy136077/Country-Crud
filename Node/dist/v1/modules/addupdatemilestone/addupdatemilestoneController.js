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
exports.AddUpadateMilestoneController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const addupdatemilestoneUtils_1 = require("./addupdatemilestoneUtils");
const constants_1 = require("../../../config/constants");
class AddUpadateMilestoneController {
    constructor() {
        this.addUpadateMilestoneUtils = new addupdatemilestoneUtils_1.AddUpadateMilestoneUtils();
        this.getAllMilestone = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addUpadateMilestoneUtils.getAllMilestone();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        /* To create new menu */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var assignData = yield this.addUpadateMilestoneUtils.create(Object.assign({}, req.body));
            return res
                .status(200)
                .json({ message: "Assign project data created successfully", data: assignData });
        });
        /**to update  */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            const result = yield this.addUpadateMilestoneUtils.update(payload, req.params.id);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addUpadateMilestoneUtils.delete(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let array = [];
            const result = yield this.addUpadateMilestoneUtils.getOne(req.params.id);
            array.push(result);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(array));
        });
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addUpadateMilestoneUtils.toggleStatus(req.body.ids, req.body.IsActive);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
            }
        });
    }
}
exports.AddUpadateMilestoneController = AddUpadateMilestoneController;
//# sourceMappingURL=addupdatemilestoneController.js.map