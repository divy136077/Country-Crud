"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const StateController_1 = require("./StateController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const stateController = new StateController_1.StateController();
// public route
router.get("/:id", stateController.getAllState);
// Export the express.Router() instance to be used by server.ts
exports.StateRoute = router;
//# sourceMappingURL=StateRoute.js.map