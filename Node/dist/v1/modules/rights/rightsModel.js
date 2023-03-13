"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightsStatusModel = exports.RightsDeleteModel = exports.RightsModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class RightsModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, slug, module_id, portal_id, status, } = body;
        this.name = name;
        this.slug = slug;
        this.module_id = module_id;
        this.portal_id = portal_id;
        this.status = status;
    }
}
__decorate([
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty()
], RightsModel.prototype, "name", void 0);
__decorate([
    class_validator_1.MaxLength(191),
    class_validator_1.IsOptional()
], RightsModel.prototype, "slug", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty()
], RightsModel.prototype, "module_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], RightsModel.prototype, "portal_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], RightsModel.prototype, "status", void 0);
exports.RightsModel = RightsModel;
class RightsDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], RightsDeleteModel.prototype, "ids", void 0);
exports.RightsDeleteModel = RightsDeleteModel;
class RightsStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], RightsStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], RightsStatusModel.prototype, "status", void 0);
exports.RightsStatusModel = RightsStatusModel;
//# sourceMappingURL=rightsModel.js.map