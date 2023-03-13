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
exports.InvoiceGenerateFromController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const InvoiceGenerateFromUtils_1 = require("./InvoiceGenerateFromUtils");
const constants_1 = require("../../../config/constants");
class InvoiceGenerateFromController {
    constructor() {
        this.invoiceGenerateFromUtils = new InvoiceGenerateFromUtils_1.InvoiceGenerateFromUtils();
        this.getAllInvoiceGenerateFrom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.invoiceGenerateFromUtils.getAllInvoiceGenerateFrom();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.InvoiceGenerateFromController = InvoiceGenerateFromController;
//# sourceMappingURL=InvoiceGenerateFromController.js.map