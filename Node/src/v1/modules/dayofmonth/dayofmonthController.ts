import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { DayOfMonthUtils } from "./dayofmonthUtils";
import { Constants } from '../../../config/constants';


export class DayOfMonthController {
  private dayOfMonthUtils: DayOfMonthUtils = new DayOfMonthUtils();

  public getAllDayOfMonth = async (req: any, res: Response) => {
    const result = await this.dayOfMonthUtils.getAllDayOfMonth();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

