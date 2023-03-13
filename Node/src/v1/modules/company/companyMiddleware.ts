import { Response } from "express";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import * as Sql from "jm-ez-mysql";

export class CompanyMiddleware {


    public IsCompanyExists = async (req: any, res: Response, next: () => void) => {

        const gotId = await Sql.query(`select * from Company where CompanyId = ${req.params.id}`)

        if (gotId == "") {
            return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_NOT_EXISTS")));
        } else {
            next();
        }
    }

    public IsValidId = async (req: any, res: Response, next: () => void) => {
        console.log("company middleware =", req.params.id)

        if (isNaN(req.params.id)) {
            return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("INVAILD_ID")));
        } else {
            next();
        }
    }

}