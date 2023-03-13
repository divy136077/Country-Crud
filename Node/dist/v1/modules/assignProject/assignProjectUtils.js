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
exports.AssignProjectUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class AssignProjectUtils {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.ASSIGN, input);
        });
    }
    /** To fetch single record */
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.GETCOUNTRY, ["*"], [id]);
        });
    }
}
exports.AssignProjectUtils = AssignProjectUtils;
//# sourceMappingURL=assignProjectUtils.js.map