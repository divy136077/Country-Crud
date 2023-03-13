"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMilestoneStatusModel = exports.PaymentMilestoneDeleteModel = exports.PaymentMilestonetModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../../model");
class PaymentMilestonetModel extends model_1.Model {
    constructor(body) {
        console.log("Body = ", body);
        super();
        if (typeof body.data === 'string') {
            body = JSON.parse(body.data);
        }
        const { MilestoneName, MilestoneAmountPercentage, ExpectedDueDtae } = body.PaymentMilestone;
        // this.ProjectId=ProjectId;
        this.MilestoneName = MilestoneName,
            this.MilestoneAmountPercentage = MilestoneAmountPercentage,
            this.ExpectedDueDtae = ExpectedDueDtae;
    }
}
exports.PaymentMilestonetModel = PaymentMilestonetModel;
class PaymentMilestoneDeleteModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids } = body.PaymentMilestone;
        this.ids = ids;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PaymentMilestoneDeleteModel.prototype, "ids", void 0);
exports.PaymentMilestoneDeleteModel = PaymentMilestoneDeleteModel;
class PaymentMilestoneStatusModel extends model_1.Model {
    constructor(body) {
        super();
        const { ids, IsActive } = body;
        this.ids = ids;
        this.IsActive = IsActive;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], PaymentMilestoneStatusModel.prototype, "ids", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], PaymentMilestoneStatusModel.prototype, "IsActive", void 0);
exports.PaymentMilestoneStatusModel = PaymentMilestoneStatusModel;
//# sourceMappingURL=paymentMilestoneModel.js.map