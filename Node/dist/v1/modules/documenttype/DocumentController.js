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
exports.DocumentTypeController = void 0;
const responseBuilder_1 = require("../../../helpers/responseBuilder");
const DocumentUtils_1 = require("./DocumentUtils");
const constants_1 = require("../../../config/constants");
class DocumentTypeController {
    constructor() {
        this.documentTypeUtils = new DocumentUtils_1.DocumentTypeUtils();
        this.getAllDocumentType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.documentTypeUtils.getAllDocumentType();
            return res.status(constants_1.Constants.OK).json(responseBuilder_1.ResponseBuilder.data(result));
        });
    }
}
exports.DocumentTypeController = DocumentTypeController;
//# sourceMappingURL=DocumentController.js.map