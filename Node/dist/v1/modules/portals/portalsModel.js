"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalStatusModel = exports.PortalsDeleteModel = exports.portalEditModel = exports.portalModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class portalModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, url, is_active, created_by } = body;
        this.name = name;
        this.url = url;
        this.status = is_active;
        this.created_by = created_by;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], portalModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], portalModel.prototype, "url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], portalModel.prototype, "status", void 0);
exports.portalModel = portalModel;
class portalEditModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, url, is_active, created_by } = body;
        this.name = name;
        this.url = url;
        this.status = is_active;
        this.created_by = created_by;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], portalEditModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], portalEditModel.prototype, "url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], portalEditModel.prototype, "status", void 0);
exports.portalEditModel = portalEditModel;
class PortalsDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PortalsDeleteModel.prototype, "ids", void 0);
exports.PortalsDeleteModel = PortalsDeleteModel;
class PortalStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, status } = body;
        this.ids = ids;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PortalStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt()
], PortalStatusModel.prototype, "status", void 0);
exports.PortalStatusModel = PortalStatusModel;
//# sourceMappingURL=portalsModel.js.map