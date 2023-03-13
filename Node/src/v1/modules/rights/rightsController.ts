import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { RightsUtils } from "./rightsUtils";
import * as l10n from "jm-ez-l10n";
import { Constants } from '../../../config/constants';
import { ModuleUtils } from "../module/moduleUtils";
import { Utils } from "../../../helpers/utils";

export class RightsController {
  private rightsUtils: RightsUtils = new RightsUtils();
  private moduleUtils: ModuleUtils = new ModuleUtils();
  private utils: Utils = new Utils();

  /** Create rights */
  public create = async (req: any, res: Response) => {      
    let payload = req.body;
    const moduleName = await this.moduleUtils.getOne(payload.module_id);
    let slugName = moduleName ? moduleName.slug + '/' + payload.name : payload.name;
    const slug = await this.rightsUtils.slug(slugName, 'slug', null,null);
    payload.slug = slug; 
    const user_id = await this.utils.authToken(req.headers.authorization);
    payload.created_by = user_id;

    const result = await this.rightsUtils.create(payload);       
    payload.id = result.insertId;

    return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
  }

  /** Update existing rights */
  public update = async (req: any, res: Response) => {
    const input = req.body;    
    const user_id = await this.utils.authToken(req.headers.authorization);
    input.updated_by = user_id;
    const result = await this.rightsUtils.update(input, req.params.id);

    if(result){
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));   
    } else{
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));   
    }
  }

  /** Fetch single record */
  public getOne = async (req: any, res: Response) => {    
    const result = await this.rightsUtils.getOne(req.params.id);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));   
  }

  /** Fetch multiple records */
  public getAll = async (req: any, res: Response) => {   
      const result = await this.rightsUtils.getAll(req.body);      
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Single delete*/
  public delete = async (req: any, res: Response) => {
       
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.rightsUtils.delete(req.params.id, user_id);

    var isDependent = req.t("DELETE_RECORD_SUCCESS");
    if(result){
      if(req.body.isDependent){
        isDependent = " But "+req.t("RECORD_EXISTS")+req.body.isDependent;
      }

      return res.status(Constants.OK).json(ResponseBuilder.successMessage(isDependent));
    } else{
      if(req.body.isDependent){
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));   
      } 
    }
  }

  /** Multiple delete */
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.rightsUtils.deleteMany(req.body.ids, user_id);

    if(result){
      if(req.body.isDependent){
        return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")+" But "+req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));  
      } 
    } else{
      if(req.body.isDependent){
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));   
      } 
    }
  }

  /** Toggle status from Active/Inactive*/
  public toggleStatus = async (req: any, res: Response) => {
       
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.rightsUtils.toggleStatus(req.body.ids, req.body.status, user_id);

    if(result){
      if(req.body.isDependent){
        return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS")+" But "+req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS")));  
      } 
    } else{
      if(req.body.isDependent){
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS")+req.body.isDependent));
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));   

      } 
    }
  }

  

}