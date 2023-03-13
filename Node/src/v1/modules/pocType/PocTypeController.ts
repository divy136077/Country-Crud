import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PocTypeUtils } from "./PocUtils";
import { Constants } from '../../../config/constants';


export class PocTypeController {
  private pocTypeUtils: PocTypeUtils = new PocTypeUtils();

  public getAllPoc = async (req: any, res: Response) => {
      const result = await this.pocTypeUtils.getAllPocType();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}