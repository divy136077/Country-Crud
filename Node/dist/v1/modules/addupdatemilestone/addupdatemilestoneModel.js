"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusModel = exports.AddUpadateMilestoneDeleteModel = exports.AddUpadateMilestoneModel = void 0;
const model_1 = require("../../../model");
const class_validator_1 = require("class-validator");
class AddUpadateMilestoneModel extends model_1.Model {
    constructor(body) {
        super();
        const { MileStoneName, MileStonePercentageId, DueDate, IsActive, IsDeleted } = body;
        this.MileStoneName = MileStoneName;
        this.MileStonePercentageId = MileStonePercentageId;
        this.DueDate = DueDate;
        this.IsActive = IsActive;
        this.IsDeleted = IsDeleted;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneModel.prototype, "MileStoneName", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneModel.prototype, "MileStonePercentageId", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneModel.prototype, "DueDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneModel.prototype, "IsActive", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneModel.prototype, "IsDeleted", void 0);
exports.AddUpadateMilestoneModel = AddUpadateMilestoneModel;
class AddUpadateMilestoneDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], AddUpadateMilestoneDeleteModel.prototype, "ids", void 0);
exports.AddUpadateMilestoneDeleteModel = AddUpadateMilestoneDeleteModel;
class ClientStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, IsActive } = body;
        this.ids = ids;
        this.IsActive = IsActive;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ClientStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ClientStatusModel.prototype, "IsActive", void 0);
exports.ClientStatusModel = ClientStatusModel;
//# sourceMappingURL=addupdatemilestoneModel.js.map