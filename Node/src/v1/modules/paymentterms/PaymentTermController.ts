import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PaymentTermUtils } from "./PaymentTermUtils";
import { Constants } from '../../../config/constants';


export class PaymentTermController {
  private paymenttermUtils: PaymentTermUtils = new PaymentTermUtils();

  public getAllPaymentTerm = async (req: any, res: Response) => {
      const result = await this.paymenttermUtils.getAllPaymentTerm();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}