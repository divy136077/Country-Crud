"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZoneRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const timezoneController_1 = require("./timezoneController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const timeZoneController = new timezoneController_1.TimeZoneController();
// public route
router.get("/getAllTimeZone", timeZoneController.getAllTimeZone);
// Export the express.Router() instance to be used by server.ts
exports.TimeZoneRoute = router;
//# sourceMappingURL=timezoneRoute.js.map