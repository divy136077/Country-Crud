"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const TaxController_1 = require("./TaxController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const taxController = new TaxController_1.TaxController();
// public route
router.get("/getalltax", taxController.getAllTax);
// Export the express.Router() instance to be used by server.ts
exports.TaxRoute = router;
//# sourceMappingURL=TaxRoute.js.map