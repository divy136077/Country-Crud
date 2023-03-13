import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ServiceLinesUtils } from "./ServiceLinesUtils";
import { Constants } from '../../../config/constants';

export class ServiceLinesController {
    private servicelinesUtils: ServiceLinesUtils = new ServiceLinesUtils();

    public getAllServiceLine = async (req: any, res: Response) => {
        const result = await this.servicelinesUtils.getAllServicesLines();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}