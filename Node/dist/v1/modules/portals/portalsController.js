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
exports.PortalsController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const PortalsUtils_1 = require("./PortalsUtils");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
const userUtils_1 = require("../user/userUtils");
const sendEmail_1 = require("../../../helpers/sendEmail");
const jwt_1 = require("../../../helpers/jwt");
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
class PortalsController {
    constructor() {
        this.portalUtils = new PortalsUtils_1.PortalsUtils();
        this.user = new userUtils_1.UserUtils();
        this.utils = new utils_1.Utils();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let payload = req.body;
            console.log(payload);
            const result = yield this.portalUtils.create(payload);
            const userresult = yield this.portalUtils.dataForMail(payload.owner);
            userresult.forEach(element => {
                console.log("userresult", this.portalUtils.dataForMail(payload.owner));
                let email = element.email_new && element.email_new != null ? element.email_new.toString() : element.email;
                const emailst = jwt_1.Jwt.getpermissionToken({ device_token: email });
                console.log('===');
                console.log(emailst);
                // res.cookie("email", emailst);
                res.setHeader('set-cookies', 'email');
                console.log('===');
                const emailData = {
                    "first_name": element.first_name,
                    "last_name": element.last_name,
                    "portalname": payload.name,
                    // "email" : emailString
                    "email": emailst
                };
                sendEmail_1.SendEmail.sendRawMail("portal", emailData, [email], `You are Portal owner`, "");
            });
            payload.id = result.insertId;
            return res.status(constants_1.Constants.CREATED).json(responseBuilder_1.ResponseBuilder.data(payload, req.t("NEW_RECORD_SUCCESS")));
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const result = yield this.portalUtils.update(payload, req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.portalUtils.getOne(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
            }
            else {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result, req.t("INVAILD_ID")));
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.portalUtils.getAll(req.body, res);
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.portalUtils.delete(req.params.id);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.portalUtils.deleteMany(req.body.ids);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
            }
        });
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.portalUtils.toggleStatus(req.body.ids, req.body.status);
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS")));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));
            }
        });
        // public truncateACL = async (req: any, res: Response) => {
        //   const result = await this.portalUtils.truncateACL();
        //   if(result){
        //     return res.status(Constants.OK).json({});   
        //   } else{
        //     return res.status(Constants.BAD_REQ).json({});   
        //   }
        // }
    }
    static create() {
        throw new Error('Method not implemented.');
    }
}
exports.PortalsController = PortalsController;
//# sourceMappingURL=portalsController.js.map