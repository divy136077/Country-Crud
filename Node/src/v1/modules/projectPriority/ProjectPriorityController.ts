import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectPriorityUtils } from "./ProjectPriorityUtils";
import { Constants } from '../../../config/constants';

export class ProjectPriorityController {
    private projectPriorityUtils: ProjectPriorityUtils = new ProjectPriorityUtils();

    public getAllProjectPriority = async (req: any, res: Response) => {
        const result = await this.projectPriorityUtils.getAllProjectPriority();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}