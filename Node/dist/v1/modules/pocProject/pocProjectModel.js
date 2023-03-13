"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocProjectStatusModel = exports.PocProjectDeleteModel = exports.PocProjectModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class PocProjectModel extends model_1.Model {
    constructor(body) {
        console.log("Body = ", body);
        super();
        if (typeof body.data === 'string') {
            body = JSON.parse(body.data);
        }
        const { 
        // ProjectId,
        POCName, Designation, PhoneNo, Email, IsActive, IsDeleted } = body.PocProject;
        // this.ProjectId=ProjectId;
        this.POCName = POCName;
        this.Designation = Designation;
        this.PhoneNo = PhoneNo;
        this.Email = Email;
        this.IsActive = IsActive;
        this.IsDeleted = IsDeleted;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectModel.prototype, "POCName", void 0);
__decorate([
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty()
], PocProjectModel.prototype, "Designation", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectModel.prototype, "PhoneNo", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectModel.prototype, "Email", void 0);
__decorate([
    class_validator_1.IsOptional()
], PocProjectModel.prototype, "IsActive", void 0);
__decorate([
    class_validator_1.IsOptional()
], PocProjectModel.prototype, "IsDeleted", void 0);
exports.PocProjectModel = PocProjectModel;
class PocProjectDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectDeleteModel.prototype, "ids", void 0);
exports.PocProjectDeleteModel = PocProjectDeleteModel;
class PocProjectStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, IsActive } = body;
        this.ids = ids;
        this.IsActive = IsActive;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PocProjectStatusModel.prototype, "IsActive", void 0);
exports.PocProjectStatusModel = PocProjectStatusModel;
//# sourceMappingURL=pocProjectModel.js.map