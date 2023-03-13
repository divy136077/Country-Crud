import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Utils } from "../../../helpers/utils";

export class ProjectUtils {
    //insert company data
    public async create(projectDetails, req): Promise<ResponseBuilder> {

        const PocProject = projectDetails.PocProject;
        const PaymentMilestone = projectDetails.PaymentMilestone
        const projectData = projectDetails.projectData
        const workOrder = projectDetails.workOrder

        console.log(PocProject)
        console.log(PaymentMilestone)
        console.log(projectData)
        console.log(workOrder)




        const data = await Sql.insert(Tables.PROJECT_DETAILS, projectData);

        PocProject['ProjectId'] = data.insertId

        workOrder['ProjectId'] = data.insertId
        
        const workOrderData = await Sql.insert(Tables.WORKORDER, workOrder);

        PaymentMilestone['WorkOrderId'] = workOrderData.insertId


        const POCdata = await Sql.insert(Tables.POC_PROJECT, PocProject);
        const Paymentdata = await Sql.insert(Tables.PAYMENT_MILESTONE, PaymentMilestone);


        return ResponseBuilder.data(data, req.t("NEW_RECORD_SUCCESS"))
    }


    

    

}
