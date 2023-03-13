"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BDMRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const BDMController_1 = require("./BDMController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const bdmController = new BDMController_1.BDMController();
// public route
router.get("/getallbdm", bdmController.getAllBDM);
// Export the express.Router() instance to be used by server.ts
exports.BDMRoute = router;
//# sourceMappingURL=BDMRoute.js.map