import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { DocumentUtils } from "./DocumentUtils";
import { Constants } from '../../../config/constants';


export class DocumentController {
  private documentUtils: DocumentUtils = new DocumentUtils();

  public create = async (req: any, res: Response) => {
    console.log(req)
    let payload = req.body;

    payload.DocumentName = req._filedata[0].newFilename;
    payload.DocumentPath = req._filedata[0].path.replace(/^\./, "");
    console.log("ffff", payload)
    const result = await this.documentUtils.create(payload);
    payload.id = result.insertId;

    const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("NEW_RECORD_SUCCESS"));
    res.status(Constants.CREATED).json(response);
    // return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
  }

  public getOne = async (req: any, res: Response) => {
    const result = await this.documentUtils.getOne(req.params.id);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  public getAll = async (req: any, res: Response) => {
    const result = await this.documentUtils.getAll(req.body);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
  public delete = async (req: any, res: Response) => {
    const result = await this.documentUtils.delete(req.params.id);
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
    }
  }


}