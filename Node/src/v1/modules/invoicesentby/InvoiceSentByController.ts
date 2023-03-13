import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { InvoiceSentByUtils } from "./invoiceSentByUtils";
import { Constants } from '../../../config/constants';


export class InvoiceSentByController {
  private invoicesentbyUtils: InvoiceSentByUtils = new InvoiceSentByUtils();

  public getAllInvoiceSentBy = async (req: any, res: Response) => {
      const result = await this.invoicesentbyUtils.getAllInvoiceSentBy();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}