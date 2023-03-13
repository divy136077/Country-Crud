"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteModel = exports.UserStatusModel = exports.VerifyOtpModel = exports.ChangePasswordModel = exports.ResetPasswordModel = exports.LoginModel = exports.ForgotPasswordModel = exports.UserUpdateModel = exports.UserModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class UserModel extends model_1.Model {
    constructor(body) {
        super();
        const { first_name, last_name, email, password, role_id, phone, profile_image, device_token, auth_token, } = body;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.role_id = role_id;
        this.phone = phone;
        this.profile_image = profile_image;
        this.device_token = device_token;
        this.auth_token = auth_token;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" }),
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "profile_image", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "permissions", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "device_token", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "auth_token", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "role_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], UserModel.prototype, "user_name", void 0);
exports.UserModel = UserModel;
class UserUpdateModel extends model_1.Model {
    constructor(body) {
        super();
        const { first_name, last_name, email, phone, } = body;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], UserUpdateModel.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserUpdateModel.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" }),
    class_validator_1.IsNotEmpty()
], UserUpdateModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserUpdateModel.prototype, "phone", void 0);
exports.UserUpdateModel = UserUpdateModel;
class ForgotPasswordModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, } = body;
        this.email = email;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ForgotPasswordModel.prototype, "email", void 0);
exports.ForgotPasswordModel = ForgotPasswordModel;
class LoginModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, password, deviceId, deviceToken } = body;
        this.email = email;
        this.password = password;
        this.deviceId = deviceId;
        this.deviceToken = deviceToken;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], LoginModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], LoginModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional()
], LoginModel.prototype, "deviceToken", void 0);
__decorate([
    class_validator_1.IsOptional()
], LoginModel.prototype, "deviceId", void 0);
exports.LoginModel = LoginModel;
class ResetPasswordModel extends model_1.Model {
    constructor(body) {
        super();
        const { newPassword, token, } = body;
        this.newPassword = newPassword;
        this.token = token;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ResetPasswordModel.prototype, "newPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ResetPasswordModel.prototype, "token", void 0);
exports.ResetPasswordModel = ResetPasswordModel;
class ChangePasswordModel extends model_1.Model {
    constructor(body) {
        super();
        const { newPassword, oldPassword, confirmPassword } = body;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
        this.confirmPassword = confirmPassword;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ChangePasswordModel.prototype, "newPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ChangePasswordModel.prototype, "oldPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ChangePasswordModel.prototype, "confirmPassword", void 0);
exports.ChangePasswordModel = ChangePasswordModel;
class VerifyOtpModel extends model_1.Model {
    constructor(body) {
        super();
        const { otp } = body;
        this.otp = otp;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], VerifyOtpModel.prototype, "otp", void 0);
exports.VerifyOtpModel = VerifyOtpModel;
class UserStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], UserStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], UserStatusModel.prototype, "status", void 0);
exports.UserStatusModel = UserStatusModel;
class UserDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], UserDeleteModel.prototype, "ids", void 0);
exports.UserDeleteModel = UserDeleteModel;
//# sourceMappingURL=userModel.js.map