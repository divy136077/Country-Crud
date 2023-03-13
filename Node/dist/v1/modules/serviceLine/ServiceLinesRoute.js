"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLinesRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ServiceLinesController_1 = require("./ServiceLinesController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const serviceLinesController = new ServiceLinesController_1.ServiceLinesController();
// public route
router.get("/getallservicelines", serviceLinesController.getAllServiceLine);
// Export the express.Router() instance to be used by server.ts
exports.ServiceLinesRoute = router;
//# sourceMappingURL=ServiceLinesRoute.js.map