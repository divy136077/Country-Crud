"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestonePercentageRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const milestonepercentageController_1 = require("./milestonepercentageController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const milestonePercentageController = new milestonepercentageController_1.MilestonePercentageController();
// public route
router.get("/getAllMilestonePercentage", milestonePercentageController.getAllMilestonePercentage);
// Export the express.Router() instance to be used by server.ts
exports.MilestonePercentageRoute = router;
//# sourceMappingURL=milestonepercentageRoute.js.map