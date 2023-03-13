"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignificanceRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const SignificanceController_1 = require("./SignificanceController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const significanceController = new SignificanceController_1.SignificanceController();
// public route
router.get("/getallsignificance", significanceController.getAllSignificance);
// Export the express.Router() instance to be used by server.ts
exports.SignificanceRoute = router;
//# sourceMappingURL=SignificanceRoute.js.map