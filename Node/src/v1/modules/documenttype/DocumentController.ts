import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { DocumentTypeUtils } from "./DocumentUtils";
import { Constants } from '../../../config/constants';


export class DocumentTypeController {
  private documentTypeUtils: DocumentTypeUtils = new DocumentTypeUtils();

  public getAllDocumentType = async (req: any, res: Response) => {
      const result = await this.documentTypeUtils.getAllDocumentType();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}