import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { SettingTypeUtils } from "./settingtypeUtils";
import * as l10n from "jm-ez-l10n";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";
import { Tables } from "../../../config/tables";
const entityName = "Module";
export class SettingTypeController {
  private settingTypeUtils: SettingTypeUtils = new SettingTypeUtils();
  private utils: Utils = new Utils();
/**
   * Create new setting type
   */
  public create = async (req: any, res: Response) => {
    let payload = req.body;
    const slug = await this.utils.slug(payload.name, 'slug', null,Tables.SETTINGTYPE);
    payload.slug = slug; 
    payload.created_by = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingTypeUtils.create(payload);       
    payload.id = result.insertId;
    return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));

  }

  /** 
  * Update existing record
  */
  public update = async (req: any, res: Response) => {
    const payload = req.body;   
    payload.updated_by = await this.utils.authToken(req.headers.authorization); 
    const result = await this.settingTypeUtils.update(payload, req.params.id);

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
    const result = await this.settingTypeUtils.getOne(req.params.id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);  
    }else{
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  /**
   * Get setting type based on slug
   */
  public getSetting = async (req: any, res: Response) => {    
    const result = await this.settingTypeUtils.getSetting(req.params.slug);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);  
    }else{
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  /**
   * Fetch all the records
  */
  public getAll = async (req: any, res: Response) => {   
      const result = await this.settingTypeUtils.getAll(req.body);      
      const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
      res.status(Constants.OK).json(response);  
  }

  /**
   * Single delete
   */
  public delete = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingTypeUtils.delete(req.params.id, user_id);
    var isDependent = "";
    if(result){
      if(req.body.isDependent){
        isDependent = " But "+req.t("RECORD_EXISTS")+req.body.isDependent;
      }

      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")+isDependent));
    } else{
      if(req.body.isDependent){
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));   
      } 
    }
  }

  /**
   * Multiple delete
   */
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.settingTypeUtils.deleteMany(req.body.ids, user_id);
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
    const result = await this.settingTypeUtils.toggleStatus(req.body.ids, req.body.status, user_id);
    if(result){
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS"));
      res.status(Constants.OK).json(response);  
    } else{
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL"), Constants.BAD_REQ));
    }
  }


}