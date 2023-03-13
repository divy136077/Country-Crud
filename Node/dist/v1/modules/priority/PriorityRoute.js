"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const PriorityController_1 = require("./PriorityController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const priorityController = new PriorityController_1.PriorityController();
// public route
router.get("/getallpriority", priorityController.getAllPriority);
// Export the express.Router() instance to be used by server.ts
exports.PriorityRoute = router;
//# sourceMappingURL=PriorityRoute.js.map