"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpadateMilestoneRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const addupdatemilestoneController_1 = require("./addupdatemilestoneController");
const addupdatemilestoneModel_1 = require("./addupdatemilestoneModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const addUpadateMilestoneController = new addupdatemilestoneController_1.AddUpadateMilestoneController();
// public route
router.get("/getAllMilestone", addUpadateMilestoneController.getAllMilestone);
router.post("/create", addUpadateMilestoneController.create);
router.put("/:id", addUpadateMilestoneController.update);
router.delete("/:id", addUpadateMilestoneController.delete);
router.get("/:id", addUpadateMilestoneController.getOne);
router.post("/toggle-status", v.validate(addupdatemilestoneModel_1.ClientStatusModel), addUpadateMilestoneController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.AddUpadateMilestoneRoute = router;
//# sourceMappingURL=addupdatemilestoneRoute.js.map