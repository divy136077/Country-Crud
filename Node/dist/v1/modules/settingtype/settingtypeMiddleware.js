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
exports.SettingTypeMiddleware = void 0;
const Sql = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
class SettingTypeMiddleware {
    constructor() {
        this.utils = new utils_1.Utils();
        /**
         * Check if setting already exists
         */
        this.IsSettintgTypeExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idWhere = '';
            if (req.params.id) {
                idWhere = ` id != ${req.params.id} AND `;
            }
            const settingtype = yield Sql.first(tables_1.Tables.SETTINGTYPE, ["id"], `${idWhere} name = ? AND status !=2`, [req.body.name]);
            if (settingtype) {
                res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.getErrorResponse({}, req.t("SETTING_TYPE_EXISTS"), constants_1.Constants.BAD_REQ));
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
        /**
         * Function to check if module is mapped with any other dependent table or not
         * @param req
         * @param res
         * @param next
         * @returns
         */
        this.checkDBDependency = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dependencyStr = yield this.utils.checkDbDependency(req, res, tables_1.Tables.SETTING, "name", `setting_type_id`);
            if (dependencyStr) {
                next();
            }
        });
    }
}
exports.SettingTypeMiddleware = SettingTypeMiddleware;
//# sourceMappingURL=settingtypeMiddleware.js.map