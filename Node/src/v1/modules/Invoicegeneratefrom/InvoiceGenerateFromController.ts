import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { InvoiceGenerateFromUtils } from "./InvoiceGenerateFromUtils";
import { Constants } from '../../../config/constants';


export class InvoiceGenerateFromController {
  private invoiceGenerateFromUtils: InvoiceGenerateFromUtils = new InvoiceGenerateFromUtils();

  public getAllInvoiceGenerateFrom = async (req: any, res: Response) => {
      const result = await this.invoiceGenerateFromUtils.getAllInvoiceGenerateFrom();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}