import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { BankDetailUtils } from "./BankDetailUtils";
import { Constants } from '../../../config/constants';


export class BankDetailController {
  private bankDetailUtils: BankDetailUtils = new BankDetailUtils();

  public getAllBankDetail = async (req: any, res: Response) => {
      const result = await this.bankDetailUtils.getAllBankDetail();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}