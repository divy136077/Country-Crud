"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTypeRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projecttypeController_1 = require("./projecttypeController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectTypeController = new projecttypeController_1.ProjectTypeController();
// public route
router.get("/getallType", projectTypeController.getAllType);
// Export the express.Router() instance to be used by server.ts
exports.ProjectTypeRoute = router;
//# sourceMappingURL=projecttypeRoute.js.map