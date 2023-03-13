import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { AccountManagerUtils } from "./AccountManagerUtils";
import { Constants } from '../../../config/constants';

export class AccountManagerController {
    private accountManagerUtils: AccountManagerUtils = new AccountManagerUtils();

    public getAllAccountManager = async (req: any, res: Response) => {
        const result = await this.accountManagerUtils.getAllAccountManager();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}