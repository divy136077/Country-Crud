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
exports.PaymentTermController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const PaymentTermUtils_1 = require("./PaymentTermUtils");
const constants_1 = require("../../../config/constants");
class PaymentTermController {
    constructor() {
        this.paymenttermUtils = new PaymentTermUtils_1.PaymentTermUtils();
        this.getAllPaymentTerm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymenttermUtils.getAllPaymentTerm();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.PaymentTermController = PaymentTermController;
//# sourceMappingURL=PaymentTermController.js.map