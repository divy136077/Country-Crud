import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { GeographyUtils } from "./GeographyUtils";
import { Constants } from '../../../config/constants';

export class GeographyController {
    private geographyUtils: GeographyUtils = new GeographyUtils();

    public getAllGeography = async (req: any, res: Response) => {
        const result = await this.geographyUtils.getAllGeography();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}