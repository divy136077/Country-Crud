"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingTypeStatusModel = exports.SettingTypeDeleteModel = exports.SettingTypeModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class SettingTypeModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, status } = body;
        this.name = name;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingTypeModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SettingTypeModel.prototype, "status", void 0);
exports.SettingTypeModel = SettingTypeModel;
class SettingTypeDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingTypeDeleteModel.prototype, "ids", void 0);
exports.SettingTypeDeleteModel = SettingTypeDeleteModel;
class SettingTypeStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingTypeStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], SettingTypeStatusModel.prototype, "status", void 0);
exports.SettingTypeStatusModel = SettingTypeStatusModel;
//# sourceMappingURL=settingtypeModel.js.map