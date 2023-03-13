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
exports.UserController = void 0;
const constants_1 = require("../../../config/constants");
const jwt_1 = require("../../../helpers/jwt");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const userUtils_1 = require("./userUtils");
const utils_1 = require("../../../helpers/utils");
const sendEmail_1 = require("../../../helpers/sendEmail");
const fs = require("fs");
const rabbitmq_1 = require("../../../rabbitmq");
var request = require('request');
const bcrypt = require('bcryptjs');
const xml2js = require('xml2js');
class UserController {
    constructor() {
        this.userUtils = new userUtils_1.UserUtils();
        this.utils = new utils_1.Utils();
        /**
         * To create a new user
         * @param req
         * @param res
         */
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.email = req.body.email.toLowerCase();
            var input = req.body;
            input.emailHash = bcrypt.hashSync(input.email, 12);
            input.password = yield utils_1.Utils.encryptText(input.password);
            input.created_by = yield this.utils.authToken(req.headers.authorization);
            delete input.role;
            const result = yield this.userUtils.createUser(input);
            if (result && result.result && result.result.id) {
                const userDetails = {
                    firstName: input.first_name,
                    lastName: input.last_name,
                    email: input.email,
                    phone: input.phone,
                    isVerified: 0,
                };
                const emailData = {
                    "username": yield utils_1.Utils.titleCase(input.first_name),
                    "verify_link": process.env.ADMINURLCONFIRM + input.emailHash,
                };
                sendEmail_1.SendEmail.sendRawMail("verify-email", emailData, [input.email], `Please confirm your email account`, "");
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("SIGNUP_SUCCESS"));
                res.status(result.code).json(response);
            }
            else {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result.result, req.t("SIGNUP_SUCCESS"));
                res.status(result.code).json(response);
            }
        });
        /**
         * To login with email and password
         * @param req
         * @param res
         * @returns
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.userUtils.getUserByEmail(email);
                console.log(result);
                if (result && result.result[0] && result.result[0].isVerified == 1) {
                    if (result.result[0].status == 1) {
                        const userData = result.result[0];
                        const verifyPassword = yield utils_1.Utils.compareEncryptedText(password, userData.password);
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
                            };
                            userDetails['token'] = jwt_1.Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
                            if (req.body.device_token) {
                                yield this.userUtils.updateDeviceToken(req.body.device_token, userData.id);
                            }
                            if (req.body.deviceId) {
                                yield this.userUtils.updateDeviceID(req.body.deviceId, userData.id);
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
                            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("LOGIN_SUCCESS"));
                            res.status(result.code).json(response);
                        }
                        else {
                            res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INVALID_CREDENTIAL"), constants_1.Constants.NOT_FOUND));
                        }
                    }
                    else {
                        res.status(constants_1.Constants.PRECONDITION_FAILED).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_UNAUTH"), constants_1.Constants.PRECONDITION_FAILED));
                    }
                }
                else {
                    res.status(constants_1.Constants.PRECONDITION_FAILED).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_VERIFIED"), constants_1.Constants.PRECONDITION_FAILED));
                }
            }
            catch (error) {
                res.status(constants_1.Constants.INTERNAL_SERVER).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), constants_1.Constants.INTERNAL_SERVER));
                return;
            }
        });
        /**
         * Send set password email on forgotPassword
         * @param req
         * @param res
         */
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const items = yield this.userUtils.getUserByEmail(req.body.email);
            if (items && items.result && items.result[0].id) {
                const objData = items.result[0];
                delete objData.password;
                const reverseIdObj = utils_1.Utils.reverseString(objData.id.toString());
                const token = jwt_1.Jwt.getAuthToken({ userId: reverseIdObj, device_token: '' });
                const url = 'http://localhost:4200/auth/set-password/' + token;
                const userDetails = items.result;
                const emailData = {
                    "reset_password_link": url,
                    "username": yield utils_1.Utils.titleCase(items.result[0].first_name)
                };
                sendEmail_1.SendEmail.sendRawMail("forgot-password", emailData, [input.email], `Reset Password`, "");
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("FORGOT_PASSWORD_LINK_SEND"));
                res.status(items.code).json(response);
            }
            else {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("EMAIL_INVALID"));
                res.status(items.code).json(response);
            }
        });
        /**
         * Reset Password
         * @param req
         * @param res
         */
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.resetPassword(req.body);
            if (result.result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("PASSWORD_RESETED"));
                res.status(result.code).json(response);
            }
            else {
                res.status(result.code).json(result);
            }
        });
        /**
         * verify the link
         * @param req
         * @param res
         */
        this.verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.verify(req);
            if (result && result.result && result.result.id) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, "Email is been Successfully verified");
                res.status(result.code).json(response);
            }
            else {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, "Email is not verified");
                res.status(result.code).json(response);
            }
        });
        /**
         * update password
         * @param req
         * @param res
         */
        this.updatePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            input.newPassword = yield utils_1.Utils.encryptText(input.newPassword);
            const user_id = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.userUtils.updatePassword(input.newPassword, user_id);
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("PASSWORD_UPDATED"));
            res.status(200).json(response);
        });
        /**
         * Get single record based on id
         * @param req
         * @param res
         */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.getOne(req.params.id);
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
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result[0], req.t("SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        this.usercount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.usercount();
            console.log(result);
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
            res.status(constants_1.Constants.OK).json(response);
        });
        /**
         * Get all the records
         * @param req
         * @param res
         */
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.getAll(req.body);
            if (result === null || result === void 0 ? void 0 : result.items) {
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
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
            res.status(constants_1.Constants.OK).json(response);
        });
        /**
         * Update record
         * @param req
         * @param res
         */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            var input;
            if (req.body && req.body.data && typeof req.body.data === "string") {
                input = JSON.parse(req.body.data);
            }
            else {
                input = req.body;
            }
            if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                if (input.oldFileName != null) {
                    var myFile = 'public/profile_images/' + input.oldFileName;
                    if (fs.existsSync(myFile)) {
                        fs.unlinkSync(myFile);
                    }
                }
                const imageUploade = yield this.utils.uploadProfile(req.files[0]);
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
            input.updated_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.userUtils.update(input, req.params.id);
            if (result) {
                const qurresult = yield this.userUtils.getOne(req.params.id);
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
                userDetails['token'] = jwt_1.Jwt.getAuthToken({ userId: qurresult[0].user_id, device_token: userDetails });
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("UPDATE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Delete record
         * @param req
         * @param res
         */
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleted_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.userUtils.delete(req.params.id, deleted_by);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Toggle status from Active/Inactive
         * @param req
         * @param res
         */
        this.toggleStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updated_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.userUtils.toggleStatus(req.body.ids, req.body.status, updated_by);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Delete multiple records
         * @param req
         * @param res
         */
        this.deleteMany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleted_by = yield this.utils.authToken(req.headers.authorization);
            const result = yield this.userUtils.deleteMany(req.body.ids, deleted_by);
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Update roles with queue
         * @param data
         * @returns
         */
        this.updateRoleDataByQueue = (data) => __awaiter(this, void 0, void 0, function* () {
            const input = data;
            const result = yield this.userUtils.updateRoleData(input.id, input.data);
            return result;
        });
        /**
         * Bulk insert data from excel or csv files
         * @param req
         * @param res
         */
        this.bulkImport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const result = yield this.userUtils.bulkImport(req, res);
            rabbitmq_1.rabbit.publishToQueue(process.env.MS_QUEUE_NAME_IMPORT_USER, JSON.stringify({
                data: input,
            }));
            if (result) {
                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("BULK_IMPORT_SUCCESS"));
                res.status(constants_1.Constants.OK).json(response);
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("BULK_IMPORT_FAIL"), constants_1.Constants.BAD_REQ));
            }
        });
        /**
         * Get data from user_imports table
         * @returns
         */
        this.getDataFromImportTable = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.getDataFromImportTable();
            return result;
        });
        /**
         * To verify OTP
         * @param req
         * @param res
         * @returns
         */
        this.verifyOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.getUserByEmail(req.body.email);
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
                };
                userDetails['token'] = jwt_1.Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
                if (req.body.otp && req.body.otp === userData.otp.toString()) {
                    let otpDate = new Date(userData.otp_sent_time);
                    let date = new Date();
                    const msBetweenDates = Math.abs(otpDate.getTime() - date.getTime());
                    const responseMin = Number(process.env.OTP_RESPONSE_TIME);
                    if (msBetweenDates > (responseMin * 60 * 1000)) { // check if otp is older then 5 minutes
                        return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("OTP_EXPIRE")));
                    }
                    const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(userDetails, req.t("USER_VERIFIED"));
                    res.status(result.code).json(response);
                }
                else {
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("OTP_INVALID")));
                }
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        /**
         * To get OTP in mail
         * @param userData for user data from db
         * @param userDetails for user object from functions
         */
        this.getOtp = (userData, userDetails) => __awaiter(this, void 0, void 0, function* () {
            const randomDigit = Math.floor(100000 + Math.random() * 900000);
            const emailData = {
                "username": yield utils_1.Utils.titleCase(userData.first_name),
                "OTP": randomDigit,
            };
            sendEmail_1.SendEmail.sendRawMail("otp-email", emailData, [userData.email.toString()], `Login OTP`, "");
            yield this.userUtils.updateOTP({ otp: randomDigit, otp_count: userData.otp_count + 1 }, userData.id);
            userDetails['verify_otp'] = 1;
            userDetails['email'] = userData.email.toString();
            userDetails['phone'] = userData.phone.toString();
            ['name', 'roleId', 'phone', 'isVerified', 'role_id', 'role_permission', 'user_permission', 'is_welcome_page', 'user_permissions'].forEach(data => delete userDetails[data]); // delete unnecessary data from object
        });
        /**
         * For resend otp to guest
         * @param req
         * @param res
         */
        this.resendOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.getUserByEmail(req.body.email);
            if (result && result.result[0]) {
                const userData = result.result[0];
                const userDetails = {
                    id: userData.id,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                };
                const sendOtpFlag = process.env.SEND_OTP_FLAG;
                if (sendOtpFlag) {
                    if (userData.otp_count < 5) {
                        yield this.getOtp(userData, userDetails);
                        res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("OTP_SENT_SUCCESSFULLY")));
                    }
                    else {
                        res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("OTP_LIMIT_EXCEEDED")));
                    }
                }
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), constants_1.Constants.NOT_FOUND));
            }
        });
        /**
         * Encrypt existing user data
         * @param req
         * @param res
         */
        this.encryptUserData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userUtils.updateExistingData();
            if (result) {
                return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.successMessage("SUCCESS"));
            }
            else {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest("FAILED"));
            }
        });
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
        this.adfslogin = (req, res) => {
            xml2js.parseString(req.body.wresult, { mergeAttrs: true }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(constants_1.Constants.INTERNAL_SERVER).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), constants_1.Constants.INTERNAL_SERVER));
                }
                const jsonString = JSON.stringify(result, null, 4);
                const json = JSON.parse(jsonString);
                var useremail = 'default';
                useremail = json["t:RequestSecurityTokenResponse"]["t:RequestedSecurityToken"][0]['saml:Assertion'][0]["saml:AttributeStatement"][0]["saml:Attribute"][0]["saml:AttributeValue"][0];
                if (useremail) {
                    const userRecords = yield this.userUtils.getUserByEmail(useremail);
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
                    };
                    var token = jwt_1.Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
                    res.cookie("token", token);
                    res.redirect(process.env.FRONT_HOST_URL);
                }
                else {
                    res.status(constants_1.Constants.INTERNAL_SERVER).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), constants_1.Constants.INTERNAL_SERVER));
                }
            }));
        };
        this.userpermission = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.userUtils.getportal(url);
            const data = yield this.userUtils.getUserByEmail(email);
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
            const menu = yield this.userUtils.getmenu(result.id);
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
                    image: userData.thumbnail_photo_base64,
                    reporting_manager_name: userData.reporting_manager_name,
                    menu: menu
                };
                userDetails['token'] = jwt_1.Jwt.getAuthToken({ userId: userData.user_id, device_token: userDetails });
                res.status(200).send({
                    Portal: portal,
                    token: userDetails["token"],
                });
            }
            // } else {
            // res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
            // }
            //});
        });
        this.userdetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var arr = [];
            const emailData = req.body.email;
            console.log("email", emailData);
            emailData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                const data = yield this.userUtils.getUserAllDetails(element);
                if (data && data.result[0]) {
                    var userData = data.result[0];
                    var getUserDetails = {
                        username: userData.first_name + ' ' + userData.last_name,
                        email: userData.email,
                        team: userData.team,
                        designation: userData.designation,
                        practice: userData.practice,
                        department: userData.department
                    };
                }
                else {
                    var staticUserDetails = {
                        username: "DEV IT",
                        email: "info@devitpl.com",
                        team: "DEV IT",
                        designation: "DEV IT",
                        practice: "DEV IT",
                        department: "DEV IT"
                    };
                }
                const userDetails = Object.assign(Object.assign({}, getUserDetails), staticUserDetails);
                arr.push(userDetails);
                console.log("jhdgjhds", userDetails);
                if (emailData.length === arr.length) {
                    arr['token'] = jwt_1.Jwt.getAuthToken({ userId: 1, device_token: arr });
                    res.status(200).send({
                        token: arr["token"],
                    });
                }
                // else  {
                //   res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.getErrorResponse({}, req.t("ERR_INTERNAL_SERVER"), Constants.INTERNAL_SERVER));
                //   }
            }));
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
        });
        this.kb_email_approver = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const approver = req.body.approver;
            const name = approver.split(" ");
            const fName = name[0];
            const lName = name[1];
            const data = yield this.userUtils.getUserByName(fName, lName);
            const email = data.result[0].email;
            res.status(200).send({
                email: email
            });
        });
        this.confirm_password = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const password = yield utils_1.Utils.encryptText(req.body.password);
            const email = req.query;
            console.log(email);
            // console.log(localStorage.getItem('userDetail'))
            const authorization = req.headers['authorization'].split(' ')[1];
            console.log('----');
            const tokenInfo = jwt_1.Jwt.decodeAuthToken(authorization.toString());
            console.log(tokenInfo.device_token.email);
            console.log(yield bcrypt.compare(email, tokenInfo.device_token.email));
            console.log('----');
            const result = yield this.userUtils.updatePasswordByEmail(password, email);
            const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse({}, req.t("PASSWORD_UPDATED"));
            res.status(200).json(response);
        });
        this.aduserimport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            request.post({
                url: process.env.ADAPIENDPOINT,
                headers: {
                    'private-key': process.env.ADAPIKEY
                }
            }, (err, response, body) => __awaiter(this, void 0, void 0, function* () {
                try {
                    //listing messages in users mailbox 
                    if (err) {
                        return res.status(500).json({ errors: "something went wrong" });
                    }
                    if (response.statusCode == 200) {
                        let emailArr = Array();
                        var userdata = JSON.parse(body);
                        const result = yield this.userUtils.getAllUsersEmail();
                        console.log(userdata);
                        result.forEach((element, index, array) => {
                            emailArr[element.id] = element.email;
                            // emailArr.push(element.email.toString());
                        });
                        if (userdata.length > 0) {
                            try {
                                let finalUserData = this.importUserData(userdata, emailArr);
                                const response = responseBuilder_1.ResponseBuilder.getMobileSuccessResponse(finalUserData, req.t("SUCCESS"));
                                return res.status(constants_1.Constants.OK).json(response);
                            }
                            catch (err) {
                                return res.status(500).json({ errors: "something went wrong" });
                            }
                        }
                        else {
                            return res.status(500).json({ errors: "something went wrong" });
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }));
        });
    }
    /**
     * importUserData
     * we will create the array for the inserting and updating the record
     * @returns
     */
    importUserData(data, emailArr) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalInsertArr = Array();
            try {
                if (data.length > 0) {
                    data.forEach((element, index, array) => __awaiter(this, void 0, void 0, function* () {
                        let finalElementData = this.modifyData(element);
                        if (!emailArr.includes(element.Email)) {
                            finalInsertArr.push(finalElementData);
                        }
                        else {
                            let id = emailArr.indexOf(element.Email);
                            //Update the available userdata 
                            const result = yield this.userUtils.updateBulkUsersData(finalElementData, id);
                        }
                    }));
                }
                if (finalInsertArr.length > 1) {
                    //bulk insert data code
                    const insertResult = yield this.userUtils.insertBulkUsersData(finalInsertArr);
                    console.log("insertResult", insertResult);
                }
                return true;
            }
            catch (err) {
                return true;
            }
        });
    }
    modifyData(finalElementData) {
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
    formateDate(date) {
        var initial = date.split(/\//);
        return ([initial[2], initial[1], initial[0]].join('/')); //=> 'yyyy/mm/dd'
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map