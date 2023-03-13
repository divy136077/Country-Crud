import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { DomesticUtils } from "./domesticUtils";
import { Constants } from '../../../config/constants';


export class DomesticController {
  private domesticUtils: DomesticUtils = new DomesticUtils();

  public getAllDomestic = async (req: any, res: Response) => {
      const result = await this.domesticUtils.getAllDomestic();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}