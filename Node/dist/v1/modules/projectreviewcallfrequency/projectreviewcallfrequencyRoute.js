"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectReviewCallFrequencyRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectreviewcallfrequencyController_1 = require("./projectreviewcallfrequencyController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectReviewCallFrequencyController = new projectreviewcallfrequencyController_1.ProjectReviewCallFrequencyController();
// public route
router.get("/getAllCallFrequency", projectReviewCallFrequencyController.getAllCallFrequency);
// Export the express.Router() instance to be used by server.ts
exports.ProjectReviewCallFrequencyRoute = router;
//# sourceMappingURL=projectreviewcallfrequencyRoute.js.map