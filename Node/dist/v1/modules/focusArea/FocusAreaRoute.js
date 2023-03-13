"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusAreaRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const FocusAreaController_1 = require("./FocusAreaController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const focusAreaController = new FocusAreaController_1.FocusAreaController();
// public route
router.get("/getallfocusarea", focusAreaController.getAllFocusArea);
// Export the express.Router() instance to be used by server.ts
exports.FocusAreaRoute = router;
//# sourceMappingURL=FocusAreaRoute.js.map