import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { BDMUtils } from "./BDMUtils";
import { Constants } from '../../../config/constants';

export class BDMController {
    private bdmUtils: BDMUtils = new BDMUtils();

    public getAllBDM = async (req: any, res: Response) => {
        const result = await this.bdmUtils.getAllBDM();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}