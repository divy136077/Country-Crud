"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const PracticeController_1 = require("./PracticeController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const practiceController = new PracticeController_1.PracticeController();
// public route
router.get("/getallpractice", practiceController.getAllPractice);
// Export the express.Router() instance to be used by server.ts
exports.PracticeRoute = router;
//# sourceMappingURL=practiceRoute.js.map