import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';

export class ClientGroupMiddleware {

    public IsValidId = async (req: any, res: Response, next: () => void) => {

        if (isNaN(req.params.id)) {
          return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
        } else {
            next();
        }
      }

 }