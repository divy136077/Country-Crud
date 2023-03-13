import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';

export class LanguageMiddleware {

  public IsLanguageExists = async (req: any, res: Response, next: () => void) => {

    let idWhere = `1=1 `;
    if (req.params.id) {
      idWhere = ` id != ${req.params.id}`
    }

    const rights: boolean = await My.first(Tables.LANGUAGE, ["id"], `${idWhere} AND name = ? AND status=1`, [req.body.name]);
    if (rights) {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("CMS_EXISTS")));
    } else {
        next();
    }
  }

  public IsValidId = async (req: any, res: Response, next: () => void) => {

    if (isNaN(req.params.id)) {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
    } else {
        next();
    }
  }

}