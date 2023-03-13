"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuStatusModel = exports.MenuDeleteModel = exports.MenusModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class MenusModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, description, status } = body;
        this.name = name;
        this.description = description;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], MenusModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(255)
], MenusModel.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], MenusModel.prototype, "status", void 0);
exports.MenusModel = MenusModel;
class MenuDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], MenuDeleteModel.prototype, "ids", void 0);
exports.MenuDeleteModel = MenuDeleteModel;
class MenuStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], MenuStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], MenuStatusModel.prototype, "status", void 0);
exports.MenuStatusModel = MenuStatusModel;
//# sourceMappingURL=menusModel.js.map