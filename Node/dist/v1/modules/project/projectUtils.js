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
exports.ProjectUtils = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
class ProjectUtils {
    //insert company data
    create(projectDetails, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const PocProject = projectDetails.PocProject;
            const PaymentMilestone = projectDetails.PaymentMilestone;
            const projectData = projectDetails.projectData;
            const workOrder = projectDetails.workOrder;
            console.log(PocProject);
            console.log(PaymentMilestone);
            console.log(projectData);
            console.log(workOrder);
            const data = yield Sql.insert(tables_1.Tables.PROJECT_DETAILS, projectData);
            PocProject['ProjectId'] = data.insertId;
            workOrder['ProjectId'] = data.insertId;
            const workOrderData = yield Sql.insert(tables_1.Tables.WORKORDER, workOrder);
            PaymentMilestone['WorkOrderId'] = workOrderData.insertId;
            const POCdata = yield Sql.insert(tables_1.Tables.POC_PROJECT, PocProject);
            const Paymentdata = yield Sql.insert(tables_1.Tables.PAYMENT_MILESTONE, PaymentMilestone);
            return responseBuilder_1.ResponseBuilder.data(data, req.t("NEW_RECORD_SUCCESS"));
        });
    }
}
exports.ProjectUtils = ProjectUtils;
//# sourceMappingURL=projectUtils.js.map