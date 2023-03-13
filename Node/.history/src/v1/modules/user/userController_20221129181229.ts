import http = require('http');
import { Response } from "express";
import * as _ from "lodash";
import { Constants } from "../../../config/constants";
import { Jwt } from "../../../helpers/jwt";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { UserUtils } from "./userUtils";
import { Utils } from "../../../helpers/utils";
import { SendEmail } from "../../../helpers/sendEmail";
import * as fs from 'fs';
import * as mv from 'mv';
import * as jwt from "jsonwebtoken";



import { rabbit } from "../../../rabbitmq";
import { Logform } from 'winston';
import { token } from 'morgan';
import { arrayify } from 'tslint/lib/utils';
var request = require('request');
const bcrypt = require('bcryptjs');
const xml2js = require('xml2js');
export class UserController {
  private userUtils: UserUtils = new UserUtils();
  private utils: Utils = new Utils();
  /**
   * To create a new user
   * @param req 
   * @param res 
   */
  public signup = async (req: any, res: Response) => {
    req.body.email = req.body.email.toLowerCase();
    var input = req.body;
    input.emailHash = bcrypt.hashSync(input.email, 12);
    input.password = await Utils.encryptText(input.password);
    input.created_by = await this.utils.authToken(req.headers.authorization);
    delete input.role;
    const result: ResponseBuilder = await this.userUtils.createUser(input);
    if (result && result.result && result.result.id) {
      const userDetails = {
        firstName: input.first_name,
        lastName: input.last_name,
        email: input.email,
        phone: input.phone,
        isVerified: 0,
      };
      const emailData = {
        "username": await Utils.titleCase(input.first_name),
        "verify_link": process.env.ADMINURLCONFIRM + input.emailHash,
      }

      SendEmail.sendRawMail("verify-email", emailData, [input.email],
        `Please confirm your email account`, "");

      const response = ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("SIGNUP_SUCCESS"));
      res.status(result.code).json(response);
    } else {
      const response = ResponseBuilder.getMobileSuccessResponse(result.result, req.t("SIGNUP_SUCCESS"));
      res.status(result.code).json(response);
    }
  }

  /**
   * To login with email and password
   * @param req 
   * @param res 
   * @returns 
   */
  public login = async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;
      const result: ResponseBuilder = await this.userUtils.getUserByEmail(email);
      console.log(result);

      if (result && result.result[0] && result.result[0].isVerified == 1) {
        if (result.result[0].status == 1) {
          const userData = result.result[0];

          const verifyPassword = await Utils.compareEncryptedText(password, userData.password);
          if (verifyPassword) {
            const userDetails = {
              id: userData.id,
              username: userData.first_name + ' ' + userData.last_name,
              first_name: userData.first_name,
              last_name: userData.last_name,
              roleId: userData.role_id,
              email: userData.email,
              phone: userData.phone,
              isVerified: userData.isVerified,
              role_id: userData.role_id,
              profile_image: userData.profile_image,
              user_permission: userData.user_permission,
              permissions: userData.permissions,
              is_welcome_page: userData.is_welcome_page,
            }
            userDetails['token'] = Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
            if (req.body.device_token) {
              await this.userUtils.updateDeviceToken(req.body.device_token, userData.id);
            }

            if (req.body.deviceId) {
              await this.userUtils.updateDeviceID(req.body.deviceId, userData.id);
            }
            /* Send OTP functionality start */
            const sendOtpFlag = process.env.SEND_OTP_FLAG;
            // if (sendOtpFlag) {
            //   const otpDate = new Date(userData.otp_sent_time);
            //   var today = new Date();
            //   if (userData.otp_count == 5 && otpDate.setHours(0, 0, 0, 0) != today.setHours(0, 0, 0, 0)) { // for resend otp
            //     await this.userUtils.updateOTP({ otp_count: 0 }, userData.id);
            //   }
            //   if (userData.otp_count < 5) {
            //     await this.getOtp(userData, userDetails);
            //   }
            //   else {
            //     // res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("OTP_LIMIT_EXCEEDED")));
            //   }z
            // }
            /* Send OTP functionality end */
            const response = ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("LOGIN_SUCCESS"));
            res.status(result.code).json(response);
          } else {
            res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("INVALID_CREDENTIAL"), Constants.NOT_FOUND));
          }
        } else {
          res.status(Constants.PRECONDITION_FAILED).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_UNAUTH"), Constants.PRECONDITION_FAILED));
        }
      } else {
        res.status(Constants.PRECONDITION_FAILED).json(ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_VERIFIED"), Constants.PRECONDITION_FAILED));
      }
    } catch (error) {
      res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
      return;
    }
  }

  /**
   * Send set password email on forgotPassword
   * @param req 
   * @param res 
   */
  public forgotPassword = async (req: any, res: Response) => {
    const input = req.body;
    const items: ResponseBuilder = await this.userUtils.getUserByEmail(req.body.email);
    if (items && items.result && items.result[0].id) {
      const objData: any = items.result[0];
      delete objData.password;
      const reverseIdObj = Utils.reverseString(objData.id.toString());
      const token = Jwt.getAuthToken({ userId: reverseIdObj, device_token: '' });
      const url = 'http://localhost:4200/auth/set-password/' + token;
      const userDetails = items.result;
      const emailData = {
        "reset_password_link": url,
        "username": await Utils.titleCase(items.result[0].first_name)
      }
      SendEmail.sendRawMail("forgot-password", emailData, [input.email],
        `Reset Password`, "");
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("FORGOT_PASSWORD_LINK_SEND"));
      res.status(items.code).json(response);
    } else {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("EMAIL_INVALID"));
      res.status(items.code).json(response);
    }
  }

  /**
   * Reset Password
   * @param req 
   * @param res 
   */
  public resetPassword = async (req: any, res: Response) => {
    const result: ResponseBuilder = await this.userUtils.resetPassword(req.body);
    if (result.result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("PASSWORD_RESETED"))
      res.status(result.code).json(response);
    } else {
      res.status(result.code).json(result);
    }
  }

  /**
   * verify the link
   * @param req 
   * @param res 
   */
  public verify = async (req: any, res: Response) => {
    const result: ResponseBuilder = await this.userUtils.verify(req);
    if (result && result.result && result.result.id) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, "Email is been Successfully verified")
      res.status(result.code).json(response);
    } else {
      const response = ResponseBuilder.getMobileSuccessResponse({}, "Email is not verified")
      res.status(result.code).json(response);
    }
  }

  /**
   * update password
   * @param req 
   * @param res 
   */
  public updatePassword = async (req: any, res: Response) => {
    const input = req.body;
    input.newPassword = await Utils.encryptText(input.newPassword);
    const user_id = await this.utils.authToken(req.headers.authorization);

    const result: ResponseBuilder = await this.userUtils.updatePassword(input.newPassword, user_id);
    const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("PASSWORD_UPDATED"));
    res.status(200).json(response);
  }

  /**
   * Get single record based on id
   * @param req 
   * @param res 
   */
  public getOne = async (req: any, res: Response) => {
    const result = await this.userUtils.getOne(req.params.id);

    if (result.length > 0) {
      // decrypted values return buffer so need to conver to string
      // result[0].email = result[0].email_new && result[0].email_new != null ? result[0].email_new.toString() : result[0].email;
      result[0].phone = result[0].phone_new && result[0].phone_new != null ? result[0].phone_new.toString() : result[0].phone;
      console.log(result[0].phone);
      // result[0].otp = result[0].otp_new && result[0].otp_new !== null ? result[0].otp_new.toString() : result[0].otp;
      // delete result[0].email_new;
      delete result[0].phone_new;
      // delete result[0].otp_new;
      console.log(225, result[0]);
      const response = ResponseBuilder.getMobileSuccessResponse(result[0], req.t("SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }
  public usercount = async (req: any, res: Response) => {
    const result = await this.userUtils.usercount();
    console.log(result);
    const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
    res.status(Constants.OK).json(response);
  }


  /**
   * Get all the records
   * @param req 
   * @param res 
   */
  public getAll = async (req: any, res: Response) => {
    const result = await this.userUtils.getAll(req.body);
    if (result?.items) {
      // decrypted values return buffer so need to conver to string
      result.items.forEach((item) => {
        if (item.email_new) {
          item.email = item.email_new.toString();
        }
        if (item.phone_new) {
          item.phone = item.phone_new.toString();
        }
        if (item.otp_new) {
          item.otp = item.otp_new.toString();
        }
      });
    }

    const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
    res.status(Constants.OK).json(response);
  }

  /**
   * Update record
   * @param req 
   * @param res 
   */
  public update = async (req: any, res: Response) => {
    var input: any;
    if (req.body && req.body.data && typeof req.body.data === "string") {
      input = JSON.parse(req.body.data);
    } else {
      input = req.body;
    }

    if (req.files?.length > 0) {
      if (input.oldFileName != null) {
        var myFile = 'public/profile_images/' + input.oldFileName;
        if (fs.existsSync(myFile)) {
          fs.unlinkSync(myFile);
        }
      }
      const imageUploade: any = await this.utils.uploadProfile(req.files[0]);
      const myImage = imageUploade.toString();
      input.profile_image = myImage;
    }
    if (input.profile_image == null) {
      if (input.oldFileName != null) {
        var myFile = 'public/profile_images/' + input.oldFileName;
        if (fs.existsSync(myFile)) {
          fs.unlinkSync(myFile);
        }
      }
    }
    delete input.oldFileName;
    input.updated_by = await this.utils.authToken(req.headers.authorization);
    const result: any = await this.userUtils.update(input, req.params.id);
    if (result) {
      const qurresult = await this.userUtils.getOne(req.params.id);
      const userDetails = {
        username: qurresult[0].first_name + ' ' + qurresult[0].last_name,
        id: qurresult[0].id,
        first_name: qurresult[0].first_name,
        last_name: qurresult[0].last_name,
        email: qurresult[0].email_new,
        phone: qurresult[0].phone_new,
        isVerified: qurresult[0].isVerified,
        role_id: qurresult[0].role_id,
        role_permission: qurresult[0].role_permission,
        user_permission: qurresult[0].user_permission,
        is_welcome_page: qurresult[0].is_welcome_page,
        profile_image: qurresult[0].profile_image,
        permissions: qurresult[0].permissions
      };
      userDetails['token'] = Jwt.getAuthToken({ userId: qurresult[0].user_id, device_token: userDetails });
      const response = ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("UPDATE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Delete record
   * @param req 
   * @param res 
   */
  public delete = async (req: any, res: Response) => {
    const deleted_by = await this.utils.authToken(req.headers.authorization);
    const result = await this.userUtils.delete(req.params.id, deleted_by);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Toggle status from Active/Inactive
   * @param req 
   * @param res 
   */
  public toggleStatus = async (req: any, res: Response) => {
    const updated_by = await this.utils.authToken(req.headers.authorization);
    const result = await this.userUtils.toggleStatus(req.body.ids, req.body.status, updated_by);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Delete multiple records
   * @param req 
   * @param res 
   */
  public deleteMany = async (req: any, res: Response) => {
    const deleted_by = await this.utils.authToken(req.headers.authorization);
    const result = await this.userUtils.deleteMany(req.body.ids, deleted_by);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  }

  /**
   * Update roles with queue
   * @param data 
   * @returns 
   */
  public updateRoleDataByQueue = async (data) => {
    const input = data;
    const result: any = await this.userUtils.updateRoleData(input.id, input.data);

    return result;
  }

  /**
   * Bulk insert data from excel or csv files
   * @param req 
   * @param res 
   */
  public bulkImport = async (req: any, res: Response) => {
    const input = req.body;
    const result: any = await this.userUtils.bulkImport(req, res);
    rabbit.publishToQueue(
      process.env.MS_QUEUE_NAME_IMPORT_USER,
      JSON.stringify({
        data: input,
      })
    );
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse({}, req.t("BULK_IMPORT_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("BULK_IMPORT_FAIL"), Constants.BAD_REQ));
    }

  }

  /**
   * Get data from user_imports table
   * @returns 
   */
  public getDataFromImportTable = async () => {
    const result: any = await this.userUtils.getDataFromImportTable();
    return result;
  }

  /**
   * To verify OTP
   * @param req 
   * @param res 
   * @returns 
   */
  public verifyOtp = async (req: any, res: Response) => {
    const result = await this.userUtils.getUserByEmail(req.body.email);

    if (result && result.result[0]) {
      const userData = result.result[0];
      const userDetails = {
        username: userData.first_name + ' ' + userData.last_name,
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        roleId: userData.role_id,
        email: userData.email.toString(),
        phone: userData.phone.toString(),
        isVerified: userData.isVerified,
        role_id: userData.role_id,
        role_permission: userData.role_permission,
        user_permission: userData.user_permission,
        is_welcome_page: userData.is_welcome_page,
        user_permissions: userData.user_permissions
      }

      userDetails['token'] = Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });

      if (req.body.otp && req.body.otp === userData.otp.toString()) {
        let otpDate = new Date(userData.otp_sent_time);
        let date = new Date();
        const msBetweenDates = Math.abs(otpDate.getTime() - date.getTime());
        const responseMin = Number(process.env.OTP_RESPONSE_TIME);
        if (msBetweenDates > (responseMin * 60 * 1000)) { // check if otp is older then 5 minutes

          return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("OTP_EXPIRE")));
        }

        const response = ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("USER_VERIFIED"));
        res.status(result.code).json(response);
      } else {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("OTP_INVALID")));
      }
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  /**
   * To get OTP in mail
   * @param userData for user data from db
   * @param userDetails for user object from functions
   */
  public getOtp = async (userData: any, userDetails: any) => {
    const randomDigit = Math.floor(100000 + Math.random() * 900000);
    const emailData = {
      "username": await Utils.titleCase(userData.first_name),
      "OTP": randomDigit,
    }

    SendEmail.sendRawMail("otp-email", emailData, [userData.email.toString()], `Login OTP`, "");

    await this.userUtils.updateOTP({ otp: randomDigit, otp_count: userData.otp_count + 1 }, userData.id);

    userDetails['verify_otp'] = 1;
    userDetails['email'] = userData.email.toString();
    userDetails['phone'] = userData.phone.toString();
    ['name', 'roleId', 'phone', 'isVerified', 'role_id', 'role_permission', 'user_permission', 'is_welcome_page', 'user_permissions'].forEach(data => delete userDetails[data]); // delete unnecessary data from object
  }

  /**
   * For resend otp to guest
   * @param req 
   * @param res 
   */
  public resendOtp = async (req: any, res: Response) => {
    const result = await this.userUtils.getUserByEmail(req.body.email);

    if (result && result.result[0]) {
      const userData = result.result[0];
      const userDetails = {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      }
      const sendOtpFlag = process.env.SEND_OTP_FLAG;
      if (sendOtpFlag) {
        if (userData.otp_count < 5) {
          await this.getOtp(userData, userDetails);
          res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("OTP_SENT_SUCCESSFULLY")));
        } else {
          res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("OTP_LIMIT_EXCEEDED")));
        }
      }
    } else {
      res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
    }
  }

  /**
   * Encrypt existing user data
   * @param req 
   * @param res 
   */
  public encryptUserData = async (req: any, res: Response) => {
    const result = await this.userUtils.updateExistingData();
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage("SUCCESS"));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest("FAILED"));
    }

  }

  // public adfslogin = async (req: any, res: Response) => {
  //   // return res.send('this test');
  //     let xml = req.body.wresult;

  //     console.log(xml);
  //     xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
  //       if (err) {
  //         throw err;
  //       }

  //       const jsonString = JSON.stringify(result, null, 4);
  //       const json = JSON.parse(jsonString)
  //       var useremail = 'default'
  //       useremail = json["t:RequestSecurityTokenResponse"]["t:RequestedSecurityToken"][0]['saml:Assertion'][0]["saml:AttributeStatement"][0]["saml:Attribute"][0]["saml:AttributeValue"][0]
  //       console.log(useremail);
  //       const user =  this.userUtils.getUserByEmail(useremail);
  //       if (user !== undefined) {
  //         const token = Jwt.getAuthTokenAdfs(
  //           {
  //             user: useremail,
  //             device_token: process.env.TOKEN_SECRET
  //           }
  //         );
  //         res.cookie("token", token);
  //         res.cookie("loginuser", useremail);
  //       }
  //       res.redirect(process.env.FRONT_HOST_URL)

  //     });
  //   }

  public adfslogin = (req: any, res: any) => {
    xml2js.parseString(req.body.wresult, { mergeAttrs: true }, async (err: any, result: any) => {
      if (err) {
        res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
      }
      const jsonString = JSON.stringify(result, null, 4);
      const json = JSON.parse(jsonString)
      var useremail = 'default'
      useremail = json["t:RequestSecurityTokenResponse"]["t:RequestedSecurityToken"][0]['saml:Assertion']
      [0]["saml:AttributeStatement"][0]["saml:Attribute"][0]["saml:AttributeValue"][0];
      if (useremail) {
        const userRecords: ResponseBuilder = await this.userUtils.getUserByEmail(useremail);
        const userData = userRecords.result[0];
        const userDetails = {
          username: userData.first_name + ' ' + userData.last_name,
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          roleId: userData.role_id,
          email: userData.email,
          phone: userData.phone,
          isVerified: userData.isVerified,
          role_id: userData.role_id,
          role_permission: userData.role_permission,
          user_permission: userData.user_permission,
          is_welcome_page: userData.is_welcome_page,
          user_permissions: userData.user_permissions
        }
        var token = Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
        res.cookie("token", token);
        res.redirect(process.env.FRONT_HOST_URL);
      } else {
        res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
      }
    });
  }
  public userpermission = async (req: any, res: Response) => {
    // xml2js.parseString(req.body.token, { mergeAttrs: true }, async (err: any, result: any) => {
    //   if (err) {
    //     res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
    //   }
    //   const jsonString = JSON.stringify(result, null, 4);
    //   const json = JSON.parse(jsonString)
    //   var useremail = 'default'
    //   useremail = json["t:RequestSecurityTokenResponse"]["t:RequestedSecurityToken"][0]['saml:Assertion']
    //   [0]["saml:AttributeStatement"][0]["saml:Attribute"][0]["saml:AttributeValue"][0];
    // if (useremail) {
    //     const email = useremail;
    const email = req.body.email;
    const url = req.headers.origin;
    const result = await this.userUtils.getportal(url);
    const data = await this.userUtils.getUserByEmail(email);
    const role_permission = JSON.parse(data.result[0].permissions);
    const user_permissions = data.result[0].user_permission ? JSON.parse(data.result[0].user_permission) : {};
    const portal = result.slug;
    let role_p = null;
    let user_p = null;
    if (Object.keys(role_permission[0]).includes(result.slug)) {
      role_p = role_permission[0][result.slug];
      role_p = JSON.stringify([role_p]);
    }
    if (user_permissions == null) {
      if (Object.keys(user_permissions[0]).includes(result.slug)) {
        user_p = user_permissions[0][result.slug];
        user_p = JSON.stringify([user_p]);
      }
    }
    const menu = await this.userUtils.getmenu(result.id);
    if (data && data.result[0]) {
      const userData = data.result[0];
      const userDetails = {
        username: userData.first_name + ' ' + userData.last_name,
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        roleId: userData.role_id,
        email: userData.email,
        phone: userData.phone,
        practice: userData.practice,
        team: userData.team,
        department: userData.department,
        designation: userData.designation,
        isVerified: userData.isVerified,
        role_id: userData.role_id,
        role_permission: userData.role_permission,
        user_permission: user_p,
        user_permissions: role_p,
        image:userData.thumbnail_photo_base64,
        reporting_manager_name:userData.reporting_manager_name,
        menu: menu

      }
      userDetails['token'] = Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
      res.status(200).send({
        Portal: portal,
        token: userDetails["token"],
      });
    }
    // } else {
    // res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
    // }
    //});
  }

  public userdetails = async (req: any, res: Response) => {
    var arr = [];
    const emailData = req.body.email;
    console.log("email", emailData);
    emailData.forEach(async (element) => {
      const data = await this.userUtils.getUserAllDetails(element);

      if (data && data.result[0]) {
        var userData = data.result[0];
        var GetuserDetails = {
          username: userData.first_name + ' ' + userData.last_name,
          email: userData.email,
          team: userData.team,
          designation: userData.designation,
          practice: userData.practice,
          department: userData.department
        }
      }
      else{
        var staticuserDetails = {
          username:"DevIT User", 
          email: "user@devitpl.com",
          team:"DevIt",
          designation:"DevIt",
          practice:"Devit",
          department:"Devit" 
        }

      }
      const userDetails = {...GetuserDetails,...staticuserDetails}
        arr.push(userDetails);
        console.log("jhdgjhds", userDetails);

        if (emailData.length === arr.length) {
          arr['token'] = Jwt.getAuthToken({ userId:1, device_token: arr });
          res.status(200).send({
            token: arr["token"],
          });
        }
      
      // else  {
      //   res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
      //   }
    });

    // const url = req.headers.origin;
    // const data = await this.userUtils.getUserByEmail(email);
    // const role_permission = JSON.parse(data.result[0].permissions);
    // const user_permissions =data.result[0].user_permission ? JSON.parse(data.result[0].user_permission) : {};

    // if (data && data.result[0]) {
    //   const userData = data.result[0];
    //   const userDetails = {
    //     username: userData.first_name + ' ' + userData.last_name,
    //     id: userData.id,
    //     first_name: userData.first_name,
    //     last_name: userData.last_name,
    //     roleId: userData.role_id,
    //     email: userData.email,
    //     phone: userData.phone,
    //     isVerified: userData.isVerified,
    //     role_id: userData.role_id,
    //     role_permission: userData.role_permission,
    //   }
    //   userDetails['token'] = Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
    //   res.status(200).send({
    //     token: userDetails["token"],
    //   });
    // }
    // } else {
    // res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
    // }
    //});
  }


  public kb_email_approver = async (req: any, res: Response) => {
    const approver = req.body.approver;
    const name = approver.split(" "); 
    const fName = name[0];
    const lName = name[1];
    const data = await this.userUtils.getUserByName(fName,lName);
    const email = data.result[0].email;   
    res.status(200).send({
      email:email  
    });
  }




  public aduserimport = async (req: any, res: Response) => {
    request.post({
      url: process.env.ADAPIENDPOINT,
      headers: {
        'private-key': process.env.ADAPIKEY
      }
    }, async (err, response, body) => {
      try {
        //listing messages in users mailbox 
        if (err) {
          return res.status(500).json({ errors: "something went wrong" });
        }
        if (response.statusCode == 200) {
          let emailArr = Array();
          var userdata = JSON.parse(body);
          const result = await this.userUtils.getAllUsersEmail();
          console.log(userdata);
          result.forEach((element, index, array) => {
            emailArr[element.id] = element.email;
            // emailArr.push(element.email.toString());
          });
          if (userdata.length > 0) {
            try {
              let finalUserData = this.importUserData(userdata, emailArr);
              const response = ResponseBuilder.getMobileSuccessResponse(finalUserData, req.t("SUCCESS"));
              return res.status(Constants.OK).json(response);
            } catch (err) {
              return res.status(500).json({ errors: "something went wrong" });
            }
          } else {
            return res.status(500).json({ errors: "something went wrong" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    })
  }
  /**
   * importUserData
   * we will create the array for the inserting and updating the record 
   * @returns 
   */
  public async importUserData(data, emailArr) {
    let finalInsertArr = Array();
    try {
      if (data.length > 0) {
        data.forEach(async (element, index, array) => {
          let finalElementData = this.modifyData(element);
          if (!emailArr.includes(element.Email)) {
            finalInsertArr.push(finalElementData);
          } else {
            let id = emailArr.indexOf(element.Email);
            //Update the available userdata 
            const result = await this.userUtils.updateBulkUsersData(finalElementData, id);
          }
        });
      }
      if (finalInsertArr.length > 1) {
        //bulk insert data code
        const insertResult = await this.userUtils.insertBulkUsersData(finalInsertArr);
        console.log("insertResult", insertResult);
      }
      return true;
    } catch (err) {
      return true;
    }
  }
  public modifyData(finalElementData) {
    let finalArr = Array();
    finalArr['band'] = finalElementData.Band;
    finalArr['birthday'] = (finalElementData.Birthday) ? this.formateDate(finalElementData.Birthday) : '';
    finalArr['joining_date'] = (finalElementData.JoiningDate) ? this.formateDate(finalElementData.JoiningDate) : '';
    finalArr['city'] = finalElementData.City;
    finalArr['country'] = finalElementData.Country;
    finalArr['department'] = finalElementData.Department;
    finalArr['designation'] = finalElementData.Designation;
    finalArr['distinguished_name'] = finalElementData.DistinguishedName;
    finalArr['email'] = finalElementData.Email;
    finalArr['employee_code'] = finalElementData.EmployeeCode;
    finalArr['external_directory_object_id'] = finalElementData.ExternalDirectoryObjectID;
    finalArr['groups'] = finalElementData.Groups;
    finalArr['location'] = finalElementData.Location;
    finalArr['phone'] = finalElementData.PhoneNumber;
    finalArr['postal_code'] = finalElementData.PostalCode;
    finalArr['practice'] = finalElementData.Practice;
    finalArr['reporting_manager'] = finalElementData.ReportingManager;
    finalArr['reporting_manager_name'] = finalElementData.ReportingManagerName;
    finalArr['requisition_Code'] = finalElementData.RequisitionCode;
    finalArr['state'] = finalElementData.State;
    finalArr['street_address'] = (finalElementData.StreetAddress != null) ? finalElementData.StreetAddress.replace(/'/g, "\\'") : null;
    finalArr['team'] = finalElementData.Team;
    finalArr['thumbnail_photo_base64'] = finalElementData.ThumbnailPhoto_base64;
    finalArr['user_name'] = finalElementData.UserName;
    finalArr['password'] = "$2a$12$b4w0Cz4nKsgnBbeRLeW8muYNpFLAqyR6ew.fSbW3gtvUg.gXjoEeu";
    let name = (finalElementData.Name) ? finalElementData.Name : '';
    name = name.trim();
    let nameArr = (name.includes(" ")) ? name.split(" ") : '';
    name = undefined;
    let first_name = (nameArr[0]) ? nameArr[0] : '';
    let last_name = (nameArr[1]) ? nameArr[1] : '';
    finalArr['first_name'] = first_name;
    finalArr['last_name'] = last_name;
    finalArr['isVerified'] = 1;
    nameArr = first_name = last_name = undefined;
    return finalArr;
  }
  public formateDate(date) {
    var initial = date.split(/\//);
    return ([initial[2], initial[1], initial[0]].join('/')); //=> 'yyyy/mm/dd'
  }

}