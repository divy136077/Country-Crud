import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";

export class MenusMiddleware {
  private utils: Utils = new Utils();
  
  /*Check if menu already exists */
  public IsModuleExists = async (req: any, res: Response, next: () => void) => {
    
    let idWhere = `1=1 `;
    // if (req.params.id) {
    //   idWhere = ` id != ${req.params.id}`
    // }

    const module: boolean = await My.first(Tables.MODULES, ["id"], `${idWhere} AND name = ? AND status=1 AND deleted=0`, [req.body.name]);
    if (module) {      
         return res.json(ResponseBuilder.badRequest( req.t("MENUS_EXISTS")));

        // return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("MODULE_EXISTS")));
    } else {
        next();
    }
  }

  /* Check if id passed is number */
  public IsValidId = async (req: any, res: Response, next: () => void) => {
       
    if (isNaN(req.params.id)) {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
    } else {
        next();
    }
  }

  /**
   * Function to check if module is mapped with any other dependent table or not
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
   public checkDBDependency = async (req: any, res: Response, next: () => void) => {
    const dbDependency = await this.utils.checkDbDependency(req, res, Tables.MENUS, "", "name", "", `parent`);
    if(dbDependency){
      next();
    }
  }

}