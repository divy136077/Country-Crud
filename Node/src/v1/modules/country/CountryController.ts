import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { CountryUtils } from "./CountryUtils";
import { Constants } from '../../../config/constants';


export class CountryController {
  private countryUtils: CountryUtils = new CountryUtils();

  public getAllCountry = async (req: any, res: Response) => {
      const result = await this.countryUtils.getAllCountry();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}