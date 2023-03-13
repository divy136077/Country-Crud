"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatusRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectststusController_1 = require("./projectststusController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectStatusController = new projectststusController_1.ProjectStatusController();
// public route
router.get("/getallStatus", projectStatusController.getAllStatus);
// Export the express.Router() instance to be used by server.ts
exports.ProjectStatusRoute = router;
//# sourceMappingURL=projectstatusRoute.js.map