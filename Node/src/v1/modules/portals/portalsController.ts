import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { PortalsUtils } from "./PortalsUtils";
import * as l10n from "jm-ez-l10n";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";
import { Tables } from "../../../config/tables";
import { UserUtils } from "../user/userUtils";
import { SendEmail } from "../../../helpers/sendEmail";
import { Jwt } from "../../../helpers/jwt";
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')

export class PortalsController {
  static create() {
    throw new Error('Method not implemented.');
  }
  private portalUtils: PortalsUtils = new PortalsUtils();
  private user: UserUtils = new UserUtils();
  private utils: Utils = new Utils();

  public create = async (req: any, res: Response) => {

    let payload = req.body;
    console.log(payload);

    const result = await this.portalUtils.create(payload);
    const userresult = await this.portalUtils.dataForMail(payload.owner);

    userresult.forEach(element => {
      console.log("userresult", this.portalUtils.dataForMail(payload.owner));
      let email = element.email_new && element.email_new != null ? element.email_new.toString() : element.email;
      
      

      const emailst = Jwt.getpermissionToken({ device_token: email });
      console.log('===')
      console.log(emailst)
      // res.cookie("email", emailst);

      res.setHeader('set-cookies', 'email')


      console.log('===')


      const emailData = {
        "first_name": element.first_name,
        "last_name": element.last_name,
        "portalname": payload.name,
        // "email" : emailString
        "email": emailst
      }
      SendEmail.sendRawMail("portal", emailData, [email],
        `You are Portal owner`, "");
    });

    payload.id = result.insertId;

    return res.status(Constants.CREATED).json(ResponseBuilder.data(payload, req.t("NEW_RECORD_SUCCESS")));
  }

  public update = async (req: any, res: Response) => {
    const payload = req.body;
    const result = await this.portalUtils.update(payload, req.params.id);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
    }
  }

  public getOne = async (req: any, res: Response) => {
    const result = await this.portalUtils.getOne(req.params.id);
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
    } else {
      return res.status(Constants.OK).json(ResponseBuilder.data(result, req.t("INVAILD_ID")));
    }

  }

  public getAll = async (req: any, res: Response) => {
    const result = await this.portalUtils.getAll(req.body,res);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  public delete = async (req: any, res: Response) => {

    const result = await this.portalUtils.delete(req.params.id);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
    }
  }

  public deleteMany = async (req: any, res: Response) => {

    const result = await this.portalUtils.deleteMany(req.body.ids);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
    }
  }

  public toggleStatus = async (req: any, res: Response) => {

    const result = await this.portalUtils.toggleStatus(req.body.ids, req.body.status);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));
    }
  }

  // public truncateACL = async (req: any, res: Response) => {
  //   const result = await this.portalUtils.truncateACL();

  //   if(result){
  //     return res.status(Constants.OK).json({});   
  //   } else{
  //     return res.status(Constants.BAD_REQ).json({});   
  //   }
  // }

}