import {
  IsEmail, IsNotEmpty, Validate, MaxLength, IsOptional, IsInt
} from "class-validator";
import {
  IsMediaSizeValidConstraint,
} from "./userValidator";
import { Model } from "../../../model";

export class UserModel extends Model {

  @IsNotEmpty()
  public first_name: string;

  @IsNotEmpty()
  public last_name: string;

  @IsEmail({}, { message: "EMAIL_INVALID" })
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public phone: string;

  @IsNotEmpty()
  public password: string;

  @IsOptional()
  public status: number;

  @IsOptional()
  public profile_image: any;

  @IsOptional()
  public location: string;

  @IsOptional()
  public permissions: string;

  @IsOptional()
  public device_token: string;

  @IsOptional()
  public auth_token: string;

  @IsNotEmpty()
  public role_id: string;


  @IsOptional()
  public user_name: string;
  constructor(body: any) {
    super();
    const {
      first_name,
      last_name,
      email,
      password,
      role_id,
      phone,
      profile_image,
      device_token,
      auth_token,
    } = body;
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

export class UserUpdateModel extends Model {

  @IsNotEmpty()
  public first_name: string;

  @IsNotEmpty()
  public last_name: string;

  @IsEmail({}, { message: "EMAIL_INVALID" })
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public phone: string;

  constructor(body: any) {
    super();
    const {
      first_name,
      last_name,
      email,
      phone,
    } = body;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
  }
}




export class ForgotPasswordModel extends Model {

  @IsNotEmpty()
  public email: string;


  constructor(body: any) {
    super();
    const {
      email,
    } = body;

    this.email = email;
  }
}

export class LoginModel extends Model {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsOptional()
  public deviceToken: any;

  @IsOptional()
  public deviceId: string;

  constructor(body: any) {
    super();
    const {
      email,
      password,
      deviceId,
      deviceToken
    } = body;

    this.email = email;
    this.password = password;
    this.deviceId = deviceId;
    this.deviceToken = deviceToken;
  }
}




export class ResetPasswordModel extends Model {
  @IsNotEmpty()
  public newPassword: number;

  @IsNotEmpty()
  public token: string;

  constructor(body: any) {
    super();
    const {
      newPassword,
      token,
    } = body;

    this.newPassword = newPassword;
    this.token = token;
  }
}

export class ChangePasswordModel extends Model {
  @IsNotEmpty()
  public newPassword: string;

  @IsNotEmpty()
  public oldPassword: string;

  @IsNotEmpty()
  public confirmPassword: string;

  constructor(body: any) {
    super();
    const {
      newPassword,
      oldPassword,
      confirmPassword
    } = body;

    this.newPassword = newPassword;
    this.oldPassword = oldPassword;
    this.confirmPassword = confirmPassword;
  }
}

export class VerifyOtpModel extends Model {
  @IsNotEmpty()
  public otp: string;

  constructor(body: any) {
    super();
    const {
      otp
    } = body;

    this.otp = otp
  }
}
export class UserStatusModel extends Model {

  @IsNotEmpty()
  public ids: string;

  @IsNotEmpty()
  @IsInt()
  public status: number;

  constructor(body: any) {
    super();
    const {
      ids,
      status
    } = body;
    this.ids = ids;
    this.status = status;
  }
}
export class UserDeleteModel extends Model {

  @IsNotEmpty()
  public ids: string;

  constructor(body: any) {
    super();
    const {
      ids
    } = body;
    this.ids = ids;
  }
}

