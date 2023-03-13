"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ClientController_1 = require("./ClientController");
const ClientMiddleware_1 = require("./ClientMiddleware");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const clientController = new ClientController_1.ClientController();
const clientMiddleware = new ClientMiddleware_1.ClientMiddleware();
// public route
router.post("/addclient", clientController.create);
router.post("/addcompany", clientController.create);
router.get("/", clientController.getClientGroup);
router.get("/:id", clientMiddleware.IsValidId, clientController.getOne);
// Export the express.Router() instance to be used by server.ts
exports.ClientRoute = router;
//# sourceMappingURL=ClientRoute.js.map