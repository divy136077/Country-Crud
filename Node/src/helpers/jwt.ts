import * as jwt from "jsonwebtoken";
// import { UserUtils } from "../v1/modules/user/userUtils";
const tokens = [];
// const userUtils: UserUtils = new UserUtils();

export class Jwt {
  /*
  * getAuthToken`
  */
  public static getAuthToken(data: { userId: number, device_token: any }) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }
  public static getpermissionToken(data: { device_token: any }) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }
  public static getAuthTokenAdfs(data: { user: any, device_token: any }) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }
  /*
  * decodeAuthToken
  */

  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return false;
      }
    }
    return false;
  }

}
