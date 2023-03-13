import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { TimeZoneUtils } from "./timezoneUtils";
import { Constants } from '../../../config/constants';


export class TimeZoneController {
  private timeZoneUtils: TimeZoneUtils = new TimeZoneUtils();

  public getAllTimeZone = async (req: any, res: Response) => {
    const result = await this.timeZoneUtils.getAllTimeZone();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

