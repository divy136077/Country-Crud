import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { GovernanceManagementUtils } from "./GovernanceManagementUtils";
import { Constants } from '../../../config/constants';

export class GovernanceManagementController {
    private governanceManagementUtils: GovernanceManagementUtils = new GovernanceManagementUtils();

    public getAllGovernanceManagement = async (req: any, res: Response) => {
        const result = await this.governanceManagementUtils.getAllGovernanceManagement();

        if(result){
            return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("DATA_FOUND")));
        }
        else{
           return res.status(Constants.CREATED).json(ResponseBuilder.dataNotFound(req.t("DATA_NOT_FOUND")));
        }
    }

}