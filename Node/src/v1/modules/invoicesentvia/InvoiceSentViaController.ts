import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { InvoiceSentViaUtils } from "./invoiceSentViaUtils";
import { Constants } from '../../../config/constants';


export class InvoiceSentViaController {
  private invoicesentviaUtils: InvoiceSentViaUtils = new InvoiceSentViaUtils();

  public getAllInvoiceSentVia = async (req: any, res: Response) => {
      const result = await this.invoicesentviaUtils.getAllInvoiceSentVia();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}