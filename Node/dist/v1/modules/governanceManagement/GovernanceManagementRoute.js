"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernanceManagementRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const GovernanceManagementController_1 = require("./GovernanceManagementController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const governanceManagementController = new GovernanceManagementController_1.GovernanceManagementController();
// public route
router.get("/getallgovernancemanagement", governanceManagementController.getAllGovernanceManagement);
// Export the express.Router() instance to be used by server.ts
exports.GovernanceManagementRoute = router;
//# sourceMappingURL=GovernanceManagementRoute.js.map