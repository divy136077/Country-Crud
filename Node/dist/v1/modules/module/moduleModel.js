"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleStatusModel = exports.ModuleDeleteModel = exports.ModuleModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class ModuleModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, description, portal_id, status } = body;
        this.name = name;
        this.description = description;
        this.portal_id = portal_id;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ModuleModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ModuleModel.prototype, "portal_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(255)
], ModuleModel.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], ModuleModel.prototype, "status", void 0);
exports.ModuleModel = ModuleModel;
class ModuleDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ModuleDeleteModel.prototype, "ids", void 0);
exports.ModuleDeleteModel = ModuleDeleteModel;
class ModuleStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ModuleStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], ModuleStatusModel.prototype, "status", void 0);
exports.ModuleStatusModel = ModuleStatusModel;
//# sourceMappingURL=moduleModel.js.map