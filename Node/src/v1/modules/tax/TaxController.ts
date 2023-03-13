import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { TaxUtils } from "./TaxUtils";
import { Constants } from '../../../config/constants';


export class TaxController {
  private taxUtils: TaxUtils = new TaxUtils();

  public getAllTax = async (req: any, res: Response) => {
      const result = await this.taxUtils.getAllTax();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}