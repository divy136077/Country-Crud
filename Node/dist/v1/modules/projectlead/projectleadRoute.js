"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLeadRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectleadController_1 = require("./projectleadController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectLeadController = new projectleadController_1.ProjectLeadController();
// public route
router.get("/getAllLead", projectLeadController.getAllLead);
// Export the express.Router() instance to be used by server.ts
exports.ProjectLeadRoute = router;
//# sourceMappingURL=projectleadRoute.js.map