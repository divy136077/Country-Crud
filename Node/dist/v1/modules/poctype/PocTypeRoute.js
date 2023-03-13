"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocTypeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const PocTypeController_1 = require("./PocTypeController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const pocTypeController = new PocTypeController_1.PocTypeController();
// public route
router.get("/getallpoctype", pocTypeController.getAllPoc);
// Export the express.Router() instance to be used by server.ts
exports.PocTypeRoute = router;
//# sourceMappingURL=PocTypeRoute.js.map