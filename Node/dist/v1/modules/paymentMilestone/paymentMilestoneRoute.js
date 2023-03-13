"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMilestoneRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const paymentMilestoneController_1 = require("./paymentMilestoneController");
const paymentMilestoneMiddleware_1 = require("./paymentMilestoneMiddleware");
const paymentMilestoneModel_1 = require("./paymentMilestoneModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const pocProjectController = new paymentMilestoneController_1.paymentMilestoneController();
const cmsMiddleware = new paymentMilestoneMiddleware_1.PaymentMilestoneMiddleware();
//poc drop  down value for name
// router.get("/pocname", pocProjectController.getPOCName);
// authorization route
router.get("/getOne/:id", cmsMiddleware.IsValidId, pocProjectController.getOne);
router.get("/", pocProjectController.getAll);
router.post("/create", v.validate(paymentMilestoneModel_1.PaymentMilestonetModel), pocProjectController.create);
router.put("/update/:id", v.validate(paymentMilestoneModel_1.PaymentMilestonetModel), cmsMiddleware.IsValidId, pocProjectController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocProjectController.delete);
router.post("/delete-many", v.validate(paymentMilestoneModel_1.PaymentMilestoneDeleteModel), pocProjectController.deleteMany);
router.put("/toggle-status", v.validate(paymentMilestoneModel_1.PaymentMilestoneStatusModel), pocProjectController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.ProjectMilestoneRoute = router;
//# sourceMappingURL=paymentMilestoneRoute.js.map