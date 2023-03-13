"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCategoryRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const resourcecategoryController_1 = require("./resourcecategoryController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const resourceCategoryController = new resourcecategoryController_1.ResourceCategoryController();
// public route
router.get("/getAllResourceCategory", resourceCategoryController.getAllResourceCategory);
// Export the express.Router() instance to be used by server.ts
exports.ResourceCategoryRoute = router;
//# sourceMappingURL=resourcecategoryRoute.js.map