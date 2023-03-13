"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectManagerRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectmanagerController_1 = require("./projectmanagerController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectManagerController = new projectmanagerController_1.ProjectManagerController();
// public route
router.get("/getAllManager", projectManagerController.getAllManager);
// Export the express.Router() instance to be used by server.ts
exports.ProjectManagerRoute = router;
//# sourceMappingURL=projectmanagerRoute.js.map