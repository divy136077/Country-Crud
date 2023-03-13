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
exports.Middleware = void 0;
const l10n = require("jm-ez-l10n");
const My = require("jm-ez-mysql");
const _ = require("lodash");
const jwt_1 = require("./helpers/jwt");
const user_1 = require("./helpers/user");
class Middleware {
    constructor() {
        this.user = new user_1.User();
        this.getUserAuthorized = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers['authorization'].split(' ')[1]; // this is for barear
            if (authorization && !_.isEmpty(authorization)) {
                try {
                    const tokenInfo = jwt_1.Jwt.decodeAuthToken(authorization.toString());
                    if (tokenInfo) {
                        //query
                        const userData = yield My.query(`SELECT u.* FROM users AS u
          WHERE u.id = ${tokenInfo.device_token.id}`);
                        const user = userData[0];
                        if (user) {
                            if (user.status == 0) {
                                return res.status(401).json({ error: req.t("INACTIVE_USER") });
                            }
                            else {
                                next();
                            }
                        }
                        else {
                            res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
                            return;
                        }
                    }
                    else {
                        res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
                        return;
                    }
                }
                catch (error) {
                    res.status(500).json({ error: l10n.t("ERR_INTERNAL_SERVER") });
                    return;
                }
            }
            else {
                if (req.path.includes('guest')) {
                    next();
                }
                else {
                    res.status(401).json({ error: l10n.t("ERR_UNAUTH") });
                    return;
                }
            }
        });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map