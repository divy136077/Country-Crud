import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PriorityUtils } from "./PriorityUtils";
import { Constants } from '../../../config/constants';

export class PriorityController {
    private priorityUtils: PriorityUtils = new PriorityUtils();

    public getAllPriority = async (req: any, res: Response) => {
        const result = await this.priorityUtils.getAllPriority();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }
}