"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNameRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const resourcenameController_1 = require("./resourcenameController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const resourceNameController = new resourcenameController_1.ResourceNameController();
// public route
router.get("/getAllResourceName", resourceNameController.getAllResourceName);
// Export the express.Router() instance to be used by server.ts
exports.ResourceNameRoute = router;
//# sourceMappingURL=resourcenameRoute.js.map