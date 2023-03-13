"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageStatusModel = exports.LanguageDeleteModel = exports.LanguageModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class LanguageModel extends model_1.Model {
    constructor(body) {
        super();
        if (typeof body.data === 'string') {
            body = JSON.parse(body.data);
        }
        const { name, locale, status } = body;
        this.name = name;
        this.locale = locale;
        this.status = status;
    }
}
__decorate([
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty()
], LanguageModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], LanguageModel.prototype, "locale", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], LanguageModel.prototype, "status", void 0);
exports.LanguageModel = LanguageModel;
class LanguageDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], LanguageDeleteModel.prototype, "ids", void 0);
exports.LanguageDeleteModel = LanguageDeleteModel;
class LanguageStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], LanguageStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], LanguageStatusModel.prototype, "status", void 0);
exports.LanguageStatusModel = LanguageStatusModel;
//# sourceMappingURL=languageModel.js.map