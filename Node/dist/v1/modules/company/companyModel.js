"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const model_1 = require("../../../model");
const class_validator_1 = require("class-validator");
class CompanyModel extends model_1.Model {
    constructor(body) {
        super();
        const { PriorityId, OverseasId, SectorId, CountryType, CountryId, GeographyId, StateId, IndustryId, EngagementMonthYear, ClientGroupId, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive, IsDelete, } = body;
        this.OverseasId = OverseasId,
            this.PriorityId = PriorityId,
            this.SectorId = SectorId,
            this.CountryType = CountryType,
            this.GeographyId = GeographyId,
            this.CountryId = CountryId,
            this.StateId = StateId,
            this.IndustryId = IndustryId,
            this.EngagementMonthYear = EngagementMonthYear,
            this.ClientGroupId = ClientGroupId,
            this.CreatedDate = CreatedDate,
            this.CreatedBy = CreatedBy,
            this.ModifiedDate = ModifiedDate,
            this.ModifiedBy = ModifiedBy,
            this.IsActive = IsActive,
            this.IsDelete = IsDelete;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], CompanyModel.prototype, "ClientGroupId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CompanyModel.prototype, "CreatedBy", void 0);
exports.CompanyModel = CompanyModel;
//# sourceMappingURL=companyModel.js.map