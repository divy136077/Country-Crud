"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientGroupRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ClientGroupMiddleware_1 = require("./ClientGroupMiddleware");
const ClientGroupController_1 = require("./ClientGroupController");
const clientgroupMiddleware = new ClientGroupMiddleware_1.ClientGroupMiddleware();
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const clientgroupController = new ClientGroupController_1.ClientGroupController();
// public route
router.get("/:id", clientgroupMiddleware.IsValidId, clientgroupController.getOne);
// Export the express.Router() instance to be used by server.ts
exports.ClientGroupRoute = router;
//# sourceMappingURL=ClientGroupRoute.js.map