"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignProjectModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class AssignProjectModel extends model_1.Model {
    constructor(body) {
        super();
        const { Name, ProjectStatusId, ProjectTypeId, ProjectManagerId, ProjectLeadId, ProjectTeamMember, AllowInProductiveApp, TimeZoneId, IMSDateFormat, IsProjectStatusEnable, ProjectStatusFrequencyId, DayOfMonthId, StarDateOfRecurrenceStatusReport, IsProjectReviewCallEnable, ProjectReviewCallFrequencyId, ReviewCallDayOfMonthId, ReviewCallStarDateOfRecurrenceStatusReport, IsCMMIProcess, ResourceCategoryId, ResourceName, BandId, ResourceLevel, TotalHours, BandRate, Amount, IsActive, IsDeleted } = body;
        this.Name = Name;
        this.ProjectStatusId = ProjectStatusId;
        this.ProjectTypeId = ProjectTypeId;
        this.ProjectManagerId = ProjectManagerId;
        this.ProjectLeadId = ProjectLeadId;
        this.ProjectTeamMember = ProjectTeamMember;
        this.AllowInProductiveApp = AllowInProductiveApp;
        this.TimeZoneId = TimeZoneId;
        this.IMSDateFormat = IMSDateFormat;
        this.IsProjectStatusEnable = IsProjectStatusEnable;
        this.ProjectStatusFrequencyId = ProjectStatusFrequencyId;
        this.DayOfMonthId = DayOfMonthId;
        this.StarDateOfRecurrenceStatusReport = StarDateOfRecurrenceStatusReport;
        this.IsProjectReviewCallEnable = IsProjectReviewCallEnable;
        this.ProjectReviewCallFrequencyId = ProjectReviewCallFrequencyId;
        this.ReviewCallDayOfMonthId = ReviewCallDayOfMonthId;
        this.ReviewCallStarDateOfRecurrenceStatusReport = ReviewCallStarDateOfRecurrenceStatusReport;
        this.IsCMMIProcess = IsCMMIProcess;
        this.ResourceCategoryId = ResourceCategoryId;
        this.ResourceName = ResourceName;
        this.BandId = BandId;
        this.ResourceLevel = ResourceLevel;
        this.TotalHours = TotalHours;
        this.BandRate = BandRate;
        this.Amount = Amount;
        this.IsActive = IsActive;
        this.IsDeleted = IsDeleted;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "Name", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectStatusId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectTypeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectManagerId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectLeadId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectTeamMember", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "AllowInProductiveApp", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "TimeZoneId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IMSDateFormat", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IsProjectStatusEnable", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectStatusFrequencyId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "DayOfMonthId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "StarDateOfRecurrenceStatusReport", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IsProjectReviewCallEnable", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ProjectReviewCallFrequencyId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ReviewCallDayOfMonthId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ReviewCallStarDateOfRecurrenceStatusReport", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IsCMMIProcess", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ResourceCategoryId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ResourceName", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "BandId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "ResourceLevel", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "TotalHours", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "BandRate", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "Amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IsActive", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AssignProjectModel.prototype, "IsDeleted", void 0);
exports.AssignProjectModel = AssignProjectModel;
//# sourceMappingURL=assignProjectModel.js.map