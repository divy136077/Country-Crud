import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PocClientUtils } from "./pocClientUtils";
import { Constants } from '../../../config/constants';


export class PocClientController {
  private pocClientUtils: PocClientUtils = new PocClientUtils();

  public create = async (req: any, res: Response) => {
    let payload = req.body;
    const result = await this.pocClientUtils.create(payload);
    payload.id = result.insertId;
    const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("NEW_RECORD_SUCCESS"));
    return res.status(Constants.CREATED).json(response);
  }

  public update = async (req: any, res: Response) => {
    let payload = req.body;

    const result = await this.pocClientUtils.update(payload, req.params.id);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  public getOne = async (req: any, res: Response) => {
    const result = await this.pocClientUtils.getOne(req.params.id);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  public getAll = async (req: any, res: Response) => {
    const result = await this.pocClientUtils.getAll(req.params.id);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  public delete = async (req: any, res: Response) => {

    const result = await this.pocClientUtils.delete(req.params.id);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
    }
  }

  public deleteMany = async (req: any, res: Response) => {

    const result = await this.pocClientUtils.deleteMany(req.body.ids);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
    }
  }

  public toggleStatus = async (req: any, res: Response) => {

    const result = await this.pocClientUtils.toggleStatus(req.body.ids, req.body.IsActive);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
    }
  }
}