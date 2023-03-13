import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import { FocusAreaUtils } from "./FocusAreaUtils" ;

export class FocusAreaController {

    private focusAreaUtils : FocusAreaUtils = new FocusAreaUtils();

    public getAllFocusArea = async(req : any, res : Response) => {
        const result = await this.focusAreaUtils.getAllFocusArea() ;

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("FOCUSAREA_NOT_EXIST")));
        }
    }
}