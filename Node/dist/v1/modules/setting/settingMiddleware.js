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
exports.SettingMiddleware = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
class SettingMiddleware {
    constructor() {
        /**
         * Check if settings already exists
         */
        this.IsSettingExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idWhere = '';
            if (req.params.id) {
                idWhere = ` id != ${req.params.id} AND `;
            }
            const setting = yield Sql.first(tables_1.Tables.SETTING, ["id"], `${idWhere} name = ? AND status !=2`, [req.body.name]);
            if (setting) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("SETTING_EXISTS"), constants_1.Constants.BAD_REQ));
            }
            else {
                next();
            }
        });
        /**
         * Check if id passed is number
         */
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(req.params.id)) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("INVAILD_ID"), constants_1.Constants.BAD_REQ));
            }
            else {
                next();
            }
        });
    }
}
exports.SettingMiddleware = SettingMiddleware;
//# sourceMappingURL=settingMiddleware.js.map