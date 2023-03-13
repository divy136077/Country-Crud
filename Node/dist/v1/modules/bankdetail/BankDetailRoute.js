"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const BankDetailController_1 = require("./BankDetailController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const bankDetailController = new BankDetailController_1.BankDetailController();
// public route
router.get("/getallbank-detail", bankDetailController.getAllBankDetail);
// Export the express.Router() instance to be used by server.ts
exports.BankDetailRoute = router;
//# sourceMappingURL=BankDetailRoute.js.map