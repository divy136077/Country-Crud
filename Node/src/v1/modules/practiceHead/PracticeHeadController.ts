import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PracticeHeadUtils } from "./PracticeHeadUtils";
import { Constants } from '../../../config/constants';

export class PracticeHeadController {
    private practiceHeadUtils: PracticeHeadUtils = new PracticeHeadUtils();

    public getAllPracticeHead = async (req: any, res: Response) => {
        const result = await this.practiceHeadUtils.getAllPracticeHead();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}