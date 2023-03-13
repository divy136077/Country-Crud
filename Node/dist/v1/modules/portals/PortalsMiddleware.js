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
exports.PortalsMiddleware = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
class PortalsMiddleware {
    constructor() {
        this.IsPortalExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idWhere = `1=1 `;
            if (req.params.id) {
                idWhere = ` id != ${req.params.id}`;
            }
            const module = yield My.first(tables_1.Tables.PORTAL, ["id"], `${idWhere} AND url = ? AND status=1 AND is_deleted=0`, [req.body.url]);
            if (module) {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("PORTAL_EXISTS")));
            }
            else {
                next();
            }
        });
        this.IsValidId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(req.params.id)) {
                return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("INVAILD_ID")));
            }
            else {
                next();
            }
        });
    }
}
exports.PortalsMiddleware = PortalsMiddleware;
//# sourceMappingURL=PortalsMiddleware.js.map