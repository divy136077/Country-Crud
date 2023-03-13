import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ServiceCategoryUtils } from "./ServiceCategoryUtils";
import { Constants } from '../../../config/constants';

export class ServiceCategoryController {
    private serviceCategoryUtils: ServiceCategoryUtils = new ServiceCategoryUtils();

    public getAllServiceCategory = async (req: any, res: Response) => {
        const result = await this.serviceCategoryUtils.getAllServicesCategory();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}