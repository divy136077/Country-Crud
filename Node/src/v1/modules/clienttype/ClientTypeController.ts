import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ClientTypeUtils } from "./ClientTypeUtils";
import { Constants } from '../../../config/constants';


export class ClientTypeController {
  private clienttypeUtils: ClientTypeUtils = new ClientTypeUtils();

  public getAllClientType = async (req: any, res: Response) => {
      const result = await this.clienttypeUtils.getAllClientType();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}