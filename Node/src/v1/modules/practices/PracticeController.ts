import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PracticeUtils } from "./PracticeUtils";
import { Constants } from '../../../config/constants';

export class PracticeController {
    private practiceUtils: PracticeUtils = new PracticeUtils();

    public getAllPractice = async (req: any, res: Response) => {
        const result = await this.practiceUtils.getAllPractice();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }
}