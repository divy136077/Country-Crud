"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentMiddleware = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
const fs = require("fs");
const mv = require('mv');
class DocumentMiddleware {
    constructor() {
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(req.params.id)) {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID")));
            }
            else {
                next();
            }
        });
    }
    fileupload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            let temp = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const imgArr = [];
                const path = './uploads/';
                const publicDir = './uploads';
                if (req.files.length < 1) {
                    res.status(constants_1.Constants.FAIL_CODE).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, "Please upload document", constants_1.Constants.FAIL_CODE));
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
            }));
            if (temp) {
                next();
            }
            else {
                res.status(constants_1.Constants.INTERNAL_SERVER).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), constants_1.Constants.INTERNAL_SERVER));
            }
        });
    }
}
exports.DocumentMiddleware = DocumentMiddleware;
//# sourceMappingURL=DocumentMiddleware.js.map