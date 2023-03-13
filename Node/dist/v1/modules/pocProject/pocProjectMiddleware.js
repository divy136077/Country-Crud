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
exports.PocProjectMiddleware = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const constants_1 = require("../../../config/constants");
class PocProjectMiddleware {
    constructor() {
        // public IsPocclientExists = async (req: any, res: Response, next: () => void) => {
        //   let idWhere = `1=1 `;
        //   if (req.params.id) {
        //     idWhere = ` id != ${req.params.id}`
        //   }
        //   const rights: boolean = await My.first(Tables.POCCLIENT, ["id"], `${idWhere} AND PocName = ? `, [req.body.PocName]);
        //   if (rights) {
        //       return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("CMS_EXISTS")));
        //   } else {
        //       next();
        //   }
        // }
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
exports.PocProjectMiddleware = PocProjectMiddleware;
//# sourceMappingURL=pocProjectMiddleware.js.map