"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeHeadRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const PracticeHeadController_1 = require("./PracticeHeadController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const practiceHeadController = new PracticeHeadController_1.PracticeHeadController();
// public route
router.get("/getallpracticehead", practiceHeadController.getAllPracticeHead);
// Export the express.Router() instance to be used by server.ts
exports.PracticeHeadRoute = router;
//# sourceMappingURL=PracticeHeadRoute.js.map