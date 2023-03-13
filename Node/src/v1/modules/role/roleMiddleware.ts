import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";

export class RoleMiddleware {
  private utils: Utils = new Utils();
  /** Check if roles exists */
  public IsRoleExists = async (req: any, res: Response, next: () => void) => {

    console.log('51', req.params.id)


    let idWhere = `1=1 `;
    // if (req.params.id) {
    // idWhere = ` id != ${req.params.id}`
    // }

    const role: boolean = await My.first(Tables.ROLES, ["id"], `${idWhere} AND name = ? AND status != 2`, [req.body.name]);

    console.log('54',req.body.name)
    
    if (role) {
      try {
        console.log('52', role)
        
        return res.json(ResponseBuilder.error(req.t("ROLE_EXISTS")));

        // return res.status(Constants.BAD_REQ).json(ResponseBuilder.error(req.t("ROLE_EXISTS")));
        
      } catch (error) {
        res.json(error)
      }
    } else {
      next();
    }
  }

  /** Check if id is valid */
  public IsValidId = async (req: any, res: Response, next: () => void) => {

    if (isNaN(req.params.id)) {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("INVAILD_ID")));
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
    const dbDependency = await this.utils.checkDbDependency(req, res, Tables.USERS, "", "first_name", "", `role_id`);
    if (dbDependency) {
      next();
    }
  }


}