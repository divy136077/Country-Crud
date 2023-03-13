import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { IndustryUtils } from "./IndustryUtils";
import { Constants } from '../../../config/constants';


export class IndustryController {
  private industryUtils: IndustryUtils = new IndustryUtils();

  public getAllIndustry = async (req: any, res: Response) => {
      const result = await this.industryUtils.getAllIndustry();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}