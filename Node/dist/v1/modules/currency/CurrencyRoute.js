"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const CurrencyController_1 = require("./CurrencyController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const currencyController = new CurrencyController_1.CurrencyController();
// public route
router.get("/getallcurrency", currencyController.getAllCurrency);
// Export the express.Router() instance to be used by server.ts
exports.CurrencyRoute = router;
//# sourceMappingURL=CurrencyRoute.js.map