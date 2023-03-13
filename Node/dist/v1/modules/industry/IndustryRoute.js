"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const IndustryController_1 = require("./IndustryController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const industryController = new IndustryController_1.IndustryController();
// public route
router.get("/getallindustry", industryController.getAllIndustry);
// Export the express.Router() instance to be used by server.ts
exports.IndustryRoute = router;
//# sourceMappingURL=IndustryRoute.js.map