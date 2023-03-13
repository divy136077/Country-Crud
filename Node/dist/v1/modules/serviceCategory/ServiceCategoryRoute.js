"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const ServiceCategoryController_1 = require("./ServiceCategoryController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const serviceCategoryController = new ServiceCategoryController_1.ServiceCategoryController();
// public route
router.get("/getallservicecategory", serviceCategoryController.getAllServiceCategory);
// Export the express.Router() instance to be used by server.ts
exports.ServiceCategoryRoute = router;
//# sourceMappingURL=ServiceCategoryRoute.js.map