"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const GeographyController_1 = require("./GeographyController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const geographyController = new GeographyController_1.GeographyController();
// public route
router.get("/getallgeography", geographyController.getAllGeography);
// Export the express.Router() instance to be used by server.ts
exports.GeographyRoute = router;
//# sourceMappingURL=GeographyRoute.js.map