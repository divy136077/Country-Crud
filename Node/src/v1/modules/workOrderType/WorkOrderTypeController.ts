import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { WorkOrderTypeUtils } from "./WorkOrderTypeUtils";
import { Constants } from '../../../config/constants';

export class WorkOrderTypeController {
    private workOrderTypeUtils: WorkOrderTypeUtils = new WorkOrderTypeUtils();

    public getAllWorkOrderType = async (req: any, res: Response) => {
        const result = await this.workOrderTypeUtils.getAllWorkOrderType();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }
}