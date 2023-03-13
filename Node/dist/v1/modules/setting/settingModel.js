"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingStatusModel = exports.SettingDeleteModel = exports.SettingModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class SettingModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, value, setting_type_id, setting_type_name, status } = body;
        this.name = name;
        this.value = value;
        this.status = status;
        this.setting_type_id = setting_type_id;
        this.setting_type_name = setting_type_name;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], SettingModel.prototype, "value", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SettingModel.prototype, "status", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty()
], SettingModel.prototype, "setting_type_id", void 0);
exports.SettingModel = SettingModel;
class SettingDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingDeleteModel.prototype, "ids", void 0);
exports.SettingDeleteModel = SettingDeleteModel;
class SettingStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], SettingStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], SettingStatusModel.prototype, "status", void 0);
exports.SettingStatusModel = SettingStatusModel;
//# sourceMappingURL=settingModel.js.map