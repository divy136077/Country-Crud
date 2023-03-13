import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
const fs = require("fs");
const mv = require('mv');

export class DocumentMiddleware {

  public IsValidId = async (req: any, res: Response, next: () => void) => {

    if (isNaN(req.params.id)) {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("INVAILD_ID")));
    } else {
      next();
    }
  }


  public async fileupload(req: any, res: Response, next: () => void) {
    console.log(req)
    let temp = await new Promise(async (resolve, reject) => {
      const imgArr = [];
      const path = './uploads/';
      const publicDir = './uploads';
      if (req.files.length < 1) {
        res.status(Constants.FAIL_CODE).json(ResponseBuilder.getErrorResponse({}, "Please upload document", Constants.FAIL_CODE));
      }
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      for (let i = 0; i < req.files.length; i++) {
        const timeStampInMs = new Date().getTime();
        const newFilename = timeStampInMs + '_' + req.files[i].originalname;
        const oldpath = req.files[i].path;
        const newpath = path + newFilename;
        mv(oldpath, newpath, function (err) {
          if (err) {
            reject(err);
          }
          const obj = {
            'filename': req.files[i].originalname,
            'newFilename': newFilename,
            'size': req.files[i].size,
            'path': newpath,
          };
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
    } else {
      res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
    }
  }

}