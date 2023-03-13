import { Response } from "express";
import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";

export class SettingTypeMiddleware {
  private utils: Utils = new Utils();

  /**
   * Check if setting already exists
   */
  public IsSettintgTypeExists = async (req: any, res: Response, next: () => void) => {

    let idWhere = '';
    if (req.params.id) {
      idWhere = ` id != ${req.params.id} AND `
    }

    const settingtype: boolean = await Sql.first(Tables.SETTINGTYPE, ["id"], `${idWhere} name = ? AND status !=2`, [req.body.name]);
    if (settingtype) {
        res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("SETTING_TYPE_EXISTS"), Constants.BAD_REQ));
    } else {
        next();
    }
  }

  /**
   * Check if id passed is number
   */
  public IsValidId = async (req: any, res: Response, next: () => void) => {
    if (isNaN(req.params.id)) {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("INVAILD_ID"), Constants.BAD_REQ));
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
    const dependencyStr = await this.utils.checkDbDependency(req, res, Tables.SETTING, "name", `setting_type_id`);
    if(dependencyStr){
      next();
    }
  }
}