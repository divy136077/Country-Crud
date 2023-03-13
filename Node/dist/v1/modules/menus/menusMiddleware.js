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
exports.MenusMiddleware = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
const utils_1 = require("../../../helpers/utils");
class MenusMiddleware {
    constructor() {
        this.utils = new utils_1.Utils();
        /*Check if menu already exists */
        this.IsModuleExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idWhere = `1=1 `;
            // if (req.params.id) {
            //   idWhere = ` id != ${req.params.id}`
            // }
            const module = yield My.first(tables_1.Tables.MODULES, ["id"], `${idWhere} AND name = ? AND status=1 AND deleted=0`, [req.body.name]);
            if (module) {
                return res.json(responseBuilder_1.ResponseBuilder.badRequest(req.t("MENUS_EXISTS")));
                // return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("MODULE_EXISTS")));
            }
            else {
                next();
            }
        });
        /* Check if id passed is number */
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(req.params.id)) {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID")));
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
            const dbDependency = yield this.utils.checkDbDependency(req, res, tables_1.Tables.MENUS, "", "name", "", `parent`);
            if (dbDependency) {
                next();
            }
        });
    }
}
exports.MenusMiddleware = MenusMiddleware;
//# sourceMappingURL=menusMiddleware.js.map