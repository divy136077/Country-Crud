import { Response } from "express";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import * as Sql from "jm-ez-mysql";

const fs = require("fs");
const mv = require('mv');

export class ProjectMiddleware {


    // public IsProjectExists = async (req: any, res: Response, next: () => void) => {

    //     const gotId = await Sql.query(`select * from Company where CompanyId = ${req.params.id}`)

    //     if (gotId == "") {
    //         return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_NOT_EXISTS")));
    //     } else {
    //         next();
    //     }
    // }

    // public IsValidId = async (req: any, res: Response, next: () => void) => {
    //     console.log("company middleware =", req.params.id)

    //     if (isNaN(req.params.id)) {
    //         return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("INVAILD_ID")));
    //     } else {
    //         next();
    //     }
    // }


    public async fileupload(req: any, res: Response, next: () => void) {


        let temp = await new Promise(async (resolve, reject) => {
            const imgArr = [];
            const path = './uploads/workorders/';
            const publicDir = './uploads/workorders';
            if (req.files.length < 1) {
                res.status(Constants.FAIL_CODE).json(ResponseBuilder.getErrorResponse({}, "Please upload document", Constants.FAIL_CODE));
            }
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir);
            }
            for (let i = 0; i < req.files.length; i++) {
                const timeStampInMs = new Date().getTime();
                const newFilename = timeStampInMs + '_' + req.files[i].file;
                const oldpath = req.files[i].path;
                const newpath = path + newFilename;
                mv(oldpath, newpath, function (err) {
                    if (err) {
                        reject(err);
                    }
                    const obj = { 'filename': req.files[i].file, 'newFilename': newFilename, 'size': req.files[i].size, 'path': newpath, };
                    imgArr.push(obj);
                    if (i == req.files.length - 1) {
                        req._filedata = imgArr; 
                        resolve(imgArr); 
                        return;
                    }
                });
            }
        });
        if (temp) {
            next();
        }
        else {
            res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
        }
    }

}