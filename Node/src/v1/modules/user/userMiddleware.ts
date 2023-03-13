import { Response } from "express";
import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { Utils } from "../../../helpers/utils";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
export class UserMiddleware {
  private utils: Utils = new Utils();
  
  /**
   * To check if phone number exists in database
   * @param req 
   * @param res 
   * @param next 
   */
  public checkMobileNumberExists = async (req: any, res: Response, next: () => void) => {
    let where = "phone = ? and status != 2";
    const params = [req.body.phone];
    const user = await Sql.query("SELECT count(u.id) as count FROM "+Tables.USERS+" AS u WHERE AES_DECRYPT(u.phone, '"+process.env.SECRET_KEY+"') LIKE ? AND u.status != 2", [req.body.phone]);

    if (user[0].count > 0) {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_MOBILE_ALREADY_EXISTS"), Constants.BAD_REQ));
    } else {
      next();
    }
  }

  /**
   * To check if email exists in database
   * @param req 
   * @param res 
   * @param next 
   */
  public checkEmailExists = async (req: any, res: Response, next: () => void) => {
    const email = req.body.email;
    const user = await Sql.query("SELECT count(u.id) as count FROM "+Tables.USERS+" AS u WHERE AES_DECRYPT(u.email, '"+process.env.SECRET_KEY+"') LIKE ? AND u.status != 2", [email])
    if (user[0].count > 0) {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_EMAIL_ALREADY_EXISTS_WITH_SAME_ROLE"), Constants.BAD_REQ));
    } else {
      next();
    } 
  }

  /**
   * To check if user exists in database
   * @param req 
   * @param res 
   * @param next 
   * returns if exists then ok
   */
  public IsUserExists = async (req: any, res: Response, next: () => void) => {
    const customer = await Sql.query("SELECT * FROM "+Tables.USERS+" AS u WHERE AES_DECRYPT(u.email, '"+process.env.SECRET_KEY+"') LIKE ?  and u.status !=2", [req.body.email]);
    if (customer.length > 0) {
        next();
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_EXISTS"), Constants.NOT_FOUND));
    }
  }

  /**
   * To check if user exists in database
   * @param req 
   * @param res 
   * @param next 
   * returns if eexists then not ok
   */
  public IsUserExistsInSignUp = async (req: any, res: Response, next: () => void) => {
    if(req.body && req.body?.flag == true){
      next();
    }else{
      const customer = await Sql.query("SELECT * FROM "+Tables.USERS+" AS u WHERE AES_DECRYPT(u.email, '"+process.env.SECRET_KEY+"') LIKE ?  and u.status !=2", [req.body.email]);  
      
      if (customer) {
        if (!customer.status) {
          res.status(Constants.UNAUTHORIZED).json(ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), Constants.UNAUTHORIZED));
        } else{
          res.status(Constants.UNAUTHORIZED).json(ResponseBuilder.getErrorResponse({}, req.t("USER_EXIST_SAME_EMAIL"), Constants.UNAUTHORIZED));
        }
      } else {
        next()
      }
    }

  }

  /**
   * Verify old and new passwords 
   * @param req 
   * @param res 
   * @param next 
   */
  public verifyOldPassword = async (req: any, res: Response, next: () => void) => {
    if (req.body.newPassword !== req.body.confirmPassword) {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("CONFIRM_PASSWORD_NOT_MATCH"), Constants.BAD_REQ));
    } else {
      const user_id = await this.utils.authToken(req.headers.authorization);
      const result = await Sql.first(Tables.USERS, ["password"], "id = ?", [user_id]);
      const comparePassword = await Utils.compareEncryptedText(req.body.oldPassword, result.password);
      if (comparePassword) {
        next();
      } else {
        res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("OLD_PASSWORD_WRONG"), Constants.BAD_REQ));
      }
    }
  }


  //Below middleware is for checking if mobile no is registered or not
  public isMobileRegistered = async (req: any, res: Response, next: () => void) => { //ask

    const user = await Sql.first(Tables.USERS, ["*"], `mobile = ?`, [req.body.mobile]);
    if (user && user.status === 0) {
      next();
    } else if (user.status === 1) {
        res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), Constants.NOT_FOUND));
    }
    else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("MOBILE_NOT_REGISTERED"), Constants.NOT_FOUND));
    }
  }

  /**
   * To check if email registered and is verified
   * @param req 
   * @param res 
   * @param next 
   */
  public isEmailRegistered = async (req: any, res: Response, next: () => void) => {
    const user = await  Sql.query("SELECT * FROM "+Tables.USERS+" AS u WHERE AES_DECRYPT(u.email, '"+process.env.SECRET_KEY+"') LIKE ?  and u.status !=2", [req.body.email]);
    if (user && user.status === 1) {
      // User not verified yet
      if(user.isVerified === 1){
        next();
      }else{
        const response = ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_VERIFIED"), Constants.FORBIDDEN);
        res.status(Constants.FORBIDDEN).json(response);
      }

    } else if (user.status === 0) {
      const response = ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), Constants.FORBIDDEN);
      res.status(Constants.FORBIDDEN).json(response);
    }
    else {
      const response = ResponseBuilder.getErrorResponse({}, req.t("EMAIL_NOT_REGISTERED"), Constants.NOT_FOUND);
      res.status(Constants.NOT_FOUND).json(response);
    }
  }
  public IsValidId = async (req: any, res: Response, next: () => void) => {
    if (isNaN(req.params.id)) {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("INVAILD_ID"), Constants.BAD_REQ));
    } else {
      next();
    }
  }

  /**
   * To check the validations for password 
   * @param req 
   * @param res 
   * @param next 
   */
  public isPasswordValid = async (req: any, res: Response, next: () => void) => {
    var passwordString = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,15}$/;

    if(req.body.password && req.body.password.match(passwordString)) {
      next();
    }else if(req.body.newPassword && req.body.newPassword.match(passwordString)) { 
      next();
    }
    else{ 
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("INVALID_PASSWORD"), Constants.BAD_REQ));
    }
  }
}