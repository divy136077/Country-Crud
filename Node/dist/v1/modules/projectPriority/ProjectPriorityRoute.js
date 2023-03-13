"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectPriorityRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ProjectPriorityController_1 = require("./ProjectPriorityController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectPriorityController = new ProjectPriorityController_1.ProjectPriorityController();
// public route
router.get("/getallprojectpriority", projectPriorityController.getAllProjectPriority);
// Export the express.Router() instance to be used by server.ts
exports.projectPriorityRoute = router;
//# sourceMappingURL=ProjectPriorityRoute.js.map