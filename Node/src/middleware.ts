import * as l10n from "jm-ez-l10n";
import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Jwt } from "./helpers/jwt";
import { Tables } from "./config/tables";
import { Request, Response } from "express";
import { User } from "./helpers/user";

export class Middleware {

  private user: User = new User();

  public getUserAuthorized = async (req: any, res: Response, next: () => void) => {
    const authorization = req.headers['authorization'].split(' ')[1]; // this is for barear
    if (authorization && !_.isEmpty(authorization)) {
      try {
        const tokenInfo = Jwt.decodeAuthToken(authorization.toString());

        if (tokenInfo) {
          //query
          const userData = await My.query(`SELECT u.* FROM users AS u
          WHERE u.id = ${tokenInfo.device_token.id}`);
          const user = userData[0];
          if (user) {
            if (user.status == 0) {
              return res.status(401).json({ error: req.t("INACTIVE_USER") });
            }
            else {
              next();
            }
          } else {
            res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
            return;
          }
        } else {
          res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
          return;
        }
      } catch (error) {
        res.status(500).json({ error: l10n.t("ERR_INTERNAL_SERVER") });
        return;
      }
    } else {
      if (req.path.includes('guest')) {
        next();
      } else {
        res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
        return;
      }
    }
  }
}
