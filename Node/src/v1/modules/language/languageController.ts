import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { LanguageUtils } from "./languageUtils";
import { Constants } from '../../../config/constants';


export class LanguageController {
  private languageUtils: LanguageUtils = new LanguageUtils();

  public create = async (req: any, res: Response) => {
     let payload = req.body;
   
    const result = await this.languageUtils.create(payload);
    payload.id = result.insertId;

    const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("NEW_RECORD_SUCCESS"));
    res.status(Constants.CREATED).json(response);
    // return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
  }

  public update = async (req: any, res: Response) => {
    let payload = req.body;
   
    const result = await this.languageUtils.update(payload, req.params.id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  public getOne = async (req: any, res: Response) => {
    const result = await this.languageUtils.getOne(req.params.id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);
    }else{
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  public getAll = async (req: any, res: Response) => {
      const result = await this.languageUtils.getAll(req.body);
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  public delete = async (req: any, res: Response) => {

    const result = await this.languageUtils.delete(req.params.id);

    if(result){
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({},req.t("DELETE_RECORD_SUCCESS")));
    } else{
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({},req.t("DELETE_RECORD_FAIL")));
    }
  }

  public deleteMany = async (req: any, res: Response) => {

    const result = await this.languageUtils.deleteMany(req.body.ids);

    if(result){
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
    } else{
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({},req.t("DELETE_RECORD_FAIL")));
    }
  }

  public toggleStatus = async (req: any, res: Response) => {

    const result = await this.languageUtils.toggleStatus(req.body.ids, req.body.status);

    if(result){
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({},req.t("UPDATE_STATUS_SUCCESS")));
    } else{
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
    }
  }

}