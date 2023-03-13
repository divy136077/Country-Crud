"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTypeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ClientTypeController_1 = require("./ClientTypeController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const clienttypeController = new ClientTypeController_1.ClientTypeController();
// public route
router.get("/getallclienttype", clienttypeController.getAllClientType);
// Export the express.Router() instance to be used by server.ts
exports.ClientTypeRoute = router;
//# sourceMappingURL=ClientTypeRoute.js.map