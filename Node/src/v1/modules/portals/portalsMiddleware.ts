import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';

export class PortalsMiddleware {
  
  public IsPortalExists = async (req: any, res: Response, next: () => void) => {
    
    let idWhere = `1=1 `;
    if (req.params.id) {
      idWhere = ` id != ${req.params.id}`
    }

    const module: boolean = await My.first(Tables.PORTAL, ["id"], `${idWhere} AND url = ? AND status=1 AND is_deleted=0`, [req.body.url]);
    if (module) {      
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("PORTAL_EXISTS")));
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