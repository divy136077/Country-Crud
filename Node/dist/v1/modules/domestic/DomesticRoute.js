"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomesticRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const DomesticController_1 = require("./DomesticController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const domesticController = new DomesticController_1.DomesticController();
// public route
router.get("/getalldomestic", domesticController.getAllDomestic);
// Export the express.Router() instance to be used by server.ts
exports.DomesticRoute = router;
//# sourceMappingURL=DomesticRoute.js.map