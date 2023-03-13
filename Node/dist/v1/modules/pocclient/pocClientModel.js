"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocClientStatusModel = exports.PocClientDeleteModel = exports.PocClientModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class PocClientModel extends model_1.Model {
    constructor(body) {
        super();
        if (typeof body.data === 'string') {
            body = JSON.parse(body.data);
        }
        const { ClientGroupId, PocTypeId, PocName, Designation, PhoneNo, Email, IsActive, IsDeleted } = body;
        this.ClientGroupId = ClientGroupId;
        this.PocTypeId = PocTypeId;
        this.PocName = PocName;
        this.Designation = Designation;
        this.PhoneNo = PhoneNo;
        this.Email = Email;
        this.IsActive = IsActive;
        this.IsDeleted = IsDeleted;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "ClientGroupId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "PocTypeId", void 0);
__decorate([
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "PocName", void 0);
__decorate([
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "Designation", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "PhoneNo", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientModel.prototype, "Email", void 0);
__decorate([
    class_validator_1.IsOptional()
], PocClientModel.prototype, "IsActive", void 0);
__decorate([
    class_validator_1.IsOptional()
], PocClientModel.prototype, "IsDeleted", void 0);
exports.PocClientModel = PocClientModel;
class PocClientDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientDeleteModel.prototype, "ids", void 0);
exports.PocClientDeleteModel = PocClientDeleteModel;
class PocClientStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, IsActive } = body;
        this.ids = ids;
        this.IsActive = IsActive;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocClientStatusModel.prototype, "IsActive", void 0);
exports.PocClientStatusModel = PocClientStatusModel;
//# sourceMappingURL=pocClientModel.js.map