"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfMonthRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const dayofmonthController_1 = require("./dayofmonthController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const dayOfMonthController = new dayofmonthController_1.DayOfMonthController();
// public route
router.get("/getAllDayOfMonth", dayOfMonthController.getAllDayOfMonth);
// Export the express.Router() instance to be used by server.ts
exports.DayOfMonthRoute = router;
//# sourceMappingURL=dayofmonthRoute.js.map