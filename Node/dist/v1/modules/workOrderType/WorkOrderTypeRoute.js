"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderTypeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const WorkOrderTypeController_1 = require("./WorkOrderTypeController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const workOrderTypeController = new WorkOrderTypeController_1.WorkOrderTypeController();
// public route
router.get("/getallworkordertype", workOrderTypeController.getAllWorkOrderType);
// Export the express.Router() instance to be used by server.ts
exports.WorkOrderTypeRoute = router;
//# sourceMappingURL=WorkOrderTypeRoute.js.map