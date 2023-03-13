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
exports.UserMiddleware = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const utils_1 = require("../../../helpers/utils");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
class UserMiddleware {
    constructor() {
        this.utils = new utils_1.Utils();
        /**
         * To check if phone number exists in database
         * @param req
         * @param res
         * @param next
         */
        this.checkMobileNumberExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let where = "phone = ? and status != 2";
            const params = [req.body.phone];
            const user = yield Sql.query("SELECT count(u.id) as count FROM " + tables_1.Tables.USERS + " AS u WHERE AES_DECRYPT(u.phone, '" + process.env.SECRET_KEY + "') LIKE ? AND u.status != 2", [req.body.phone]);
            if (user[0].count > 0) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_MOBILE_ALREADY_EXISTS"), constants_1.Constants.BAD_REQ));
            }
            else {
                next();
            }
        });
        /**
         * To check if email exists in database
         * @param req
         * @param res
         * @param next
         */
        this.checkEmailExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const user = yield Sql.query("SELECT count(u.id) as count FROM " + tables_1.Tables.USERS + " AS u WHERE AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') LIKE ? AND u.status != 2", [email]);
            if (user[0].count > 0) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("ERR_EMAIL_ALREADY_EXISTS_WITH_SAME_ROLE"), constants_1.Constants.BAD_REQ));
            }
            else {
                next();
            }
        });
        /**
         * To check if user exists in database
         * @param req
         * @param res
         * @param next
         * returns if exists then ok
         */
        this.IsUserExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const customer = yield Sql.query("SELECT * FROM " + tables_1.Tables.USERS + " AS u WHERE AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') LIKE ?  and u.status !=2", [req.body.email]);
            if (customer.length > 0) {
                next();
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_EXISTS"), constants_1.Constants.NOT_FOUND));
            }
        });
        /**
         * To check if user exists in database
         * @param req
         * @param res
         * @param next
         * returns if eexists then not ok
         */
        this.IsUserExistsInSignUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (req.body && ((_a = req.body) === null || _a === void 0 ? void 0 : _a.flag) == true) {
                next();
            }
            else {
                const customer = yield Sql.query("SELECT * FROM " + tables_1.Tables.USERS + " AS u WHERE AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') LIKE ?  and u.status !=2", [req.body.email]);
                if (customer) {
                    if (!customer.status) {
                        res.status(constants_1.Constants.UNAUTHORIZED).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), constants_1.Constants.UNAUTHORIZED));
                    }
                    else {
                        res.status(constants_1.Constants.UNAUTHORIZED).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("USER_EXIST_SAME_EMAIL"), constants_1.Constants.UNAUTHORIZED));
                    }
                }
                else {
                    next();
                }
            }
        });
        /**
         * Verify old and new passwords
         * @param req
         * @param res
         * @param next
         */
        this.verifyOldPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.newPassword !== req.body.confirmPassword) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("CONFIRM_PASSWORD_NOT_MATCH"), constants_1.Constants.BAD_REQ));
            }
            else {
                const user_id = yield this.utils.authToken(req.headers.authorization);
                const result = yield Sql.first(tables_1.Tables.USERS, ["password"], "id = ?", [user_id]);
                const comparePassword = yield utils_1.Utils.compareEncryptedText(req.body.oldPassword, result.password);
                if (comparePassword) {
                    next();
                }
                else {
                    res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("OLD_PASSWORD_WRONG"), constants_1.Constants.BAD_REQ));
                }
            }
        });
        //Below middleware is for checking if mobile no is registered or not
        this.isMobileRegistered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield Sql.first(tables_1.Tables.USERS, ["*"], `mobile = ?`, [req.body.mobile]);
            if (user && user.status === 0) {
                next();
            }
            else if (user.status === 1) {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), constants_1.Constants.NOT_FOUND));
            }
            else {
                res.status(constants_1.Constants.NOT_FOUND).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("MOBILE_NOT_REGISTERED"), constants_1.Constants.NOT_FOUND));
            }
        });
        /**
         * To check if email registered and is verified
         * @param req
         * @param res
         * @param next
         */
        this.isEmailRegistered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield Sql.query("SELECT * FROM " + tables_1.Tables.USERS + " AS u WHERE AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') LIKE ?  and u.status !=2", [req.body.email]);
            if (user && user.status === 1) {
                // User not verified yet
                if (user.isVerified === 1) {
                    next();
                }
                else {
                    const response = responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("USER_NOT_VERIFIED"), constants_1.Constants.FORBIDDEN);
                    res.status(constants_1.Constants.FORBIDDEN).json(response);
                }
            }
            else if (user.status === 0) {
                const response = responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INACTIVE_USER"), constants_1.Constants.FORBIDDEN);
                res.status(constants_1.Constants.FORBIDDEN).json(response);
            }
            else {
                const response = responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("EMAIL_NOT_REGISTERED"), constants_1.Constants.NOT_FOUND);
                res.status(constants_1.Constants.NOT_FOUND).json(response);
            }
        });
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(req.params.id)) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INVAILD_ID"), constants_1.Constants.BAD_REQ));
            }
            else {
                next();
            }
        });
        /**
         * To check the validations for password
         * @param req
         * @param res
         * @param next
         */
        this.isPasswordValid = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var passwordString = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,15}$/;
            if (req.body.password && req.body.password.match(passwordString)) {
                next();
            }
            else if (req.body.newPassword && req.body.newPassword.match(passwordString)) {
                next();
            }
            else {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INVALID_PASSWORD"), constants_1.Constants.BAD_REQ));
            }
        });
    }
}
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map