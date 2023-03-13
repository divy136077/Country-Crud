"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceBandRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const resourcebandController_1 = require("./resourcebandController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const resourceBandController = new resourcebandController_1.ResourceBandController();
// public route
router.get("/getAllResourceBand", resourceBandController.getAllResourceBand);
// Export the express.Router() instance to be used by server.ts
exports.ResourceBandRoute = router;
//# sourceMappingURL=resourcebandRoute.js.map