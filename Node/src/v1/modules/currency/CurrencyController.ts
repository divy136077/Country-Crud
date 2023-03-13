import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { CurrencyUtils } from "./CurrencyUtils";
import { Constants } from '../../../config/constants';


export class CurrencyController {
  private currencyUtils: CurrencyUtils = new CurrencyUtils();

  public getAllCurrency = async (req: any, res: Response) => {
      const result = await this.currencyUtils.getAllCurrency();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}