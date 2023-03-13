"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatusFrequencyRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectstatusfrequencyController_1 = require("./projectstatusfrequencyController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectStatusFrequencyController = new projectstatusfrequencyController_1.ProjectStatusFrequencyController();
// public route
router.get("/getAllProjectStatusFrequency", projectStatusFrequencyController.getAllProjectStatusFrequency);
// Export the express.Router() instance to be used by server.ts
exports.ProjectStatusFrequencyRoute = router;
//# sourceMappingURL=projectstatusfrequencyRoute.js.map