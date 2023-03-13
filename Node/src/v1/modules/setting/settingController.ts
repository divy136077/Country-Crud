import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { SettingUtils } from "./settingUtils";
import * as l10n from "jm-ez-l10n";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";
import { Tables } from "../../../config/tables";
const entityName = "Module";
export class SettingController {
  private settingUtils: SettingUtils = new SettingUtils();
  private utils: Utils = new Utils();

  /**
   * Create new setting
   */
  public create = async (req: any, res: Response) => {
    let payload = req.body;
    const slug = await this.utils.slug(payload.name, 'slug', null,Tables.SETTING);
    payload.slug = slug; 
    payload.created_by = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingUtils.create(payload);       
    payload.id = result.insertId;

    const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("ADDED_SUCCESS",{entityName}));
    res.status(Constants.CREATED).json(response);
  }

  /** 
   * Update existing record
   */
  public update = async (req: any, res: Response) => {
    const payload = req.body;   
    payload.updated_by = await this.utils.authToken(req.headers.authorization); 
    const result = await this.settingUtils.update(payload, req.params.id);

    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response); 
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Fetch single record by id
   */
  public getOne = async (req: any, res: Response) => {    
    const result = await this.settingUtils.getOne(req.params.id);
    if(result){
      result[0].value = result[0].value.toString();
      const response = ResponseBuilder.getMobileSuccessResponse(result[0], req.t("SUCCESS"));
      res.status(Constants.OK).json(response);  
    }else{
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  /**
   * Fetch all the records
   */
  public getAll = async (req: any, res: Response) => {   
      const result = await this.settingUtils.getAll(req.body);      
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);  
  }

  /**
   * Single delete
   */
  public delete = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingUtils.delete(req.params.id, user_id);
    if(result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);  
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Multiple delete
   */
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingUtils.deleteMany(req.body.ids, user_id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);   
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Toggle status from Active/Inactive
   */
  public toggleStatus = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingUtils.toggleStatus(req.body.ids, req.body.status, user_id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS"));
      res.status(Constants.OK).json(response);  
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL"), Constants.BAD_REQ));
    }
  }
  
  /**
   * Encrypt existing user data
   */
   public encryptUserData = async (req: any, res: Response) => {
    const result = await this.settingUtils.updateExistingData();
    if(result){
      return res.status(Constants.OK).json(ResponseBuilder.successMessage("SUCCESS"));
    }else{
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest("FAILED"));
    }
   
  }

}