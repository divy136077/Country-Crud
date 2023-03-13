import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ClientGroupUtils } from "./ClientGroupUtils";
import { Constants } from '../../../config/constants';


export class ClientGroupController {
  private clientgroupUtils: ClientGroupUtils = new ClientGroupUtils();

  public getOne = async (req: any, res: Response) => {
    const result = await this.clientgroupUtils.getOne(req.params.id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);
    }else{
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }
}