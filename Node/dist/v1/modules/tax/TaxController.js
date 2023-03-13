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
exports.TaxController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const TaxUtils_1 = require("./TaxUtils");
const constants_1 = require("../../../config/constants");
class TaxController {
    constructor() {
        this.taxUtils = new TaxUtils_1.TaxUtils();
        this.getAllTax = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taxUtils.getAllTax();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.TaxController = TaxController;
//# sourceMappingURL=TaxController.js.map