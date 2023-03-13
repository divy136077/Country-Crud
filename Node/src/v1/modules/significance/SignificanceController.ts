import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { SignificanceUtils } from "./SignificanceUtils";
import { Constants } from '../../../config/constants';

export class SignificanceController {
    private significanceUtils: SignificanceUtils = new SignificanceUtils();

    public getAllSignificance = async (req: any, res: Response) => {
        const result = await this.significanceUtils.getAllSignificance();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }
}