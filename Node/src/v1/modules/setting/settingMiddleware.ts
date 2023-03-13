import { Response } from "express";
import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';

export class SettingMiddleware {

  /**
   * Check if settings already exists
   */
  public IsSettingExists = async (req: any, res: Response, next: () => void) => {

    let idWhere = '';
    if (req.params.id) {
      idWhere = ` id != ${req.params .id} AND `
    }

    const setting: boolean = await Sql.first(Tables.SETTING, ["id"], `${idWhere} name = ? AND status !=2`, [req.body.name]);
    if (setting) {
        res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("SETTING_EXISTS"), Constants.BAD_REQ));
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
}