"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTermRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const PaymentTermController_1 = require("./PaymentTermController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const paymenttermController = new PaymentTermController_1.PaymentTermController();
// public route
router.get("/getallpaymentterm", paymenttermController.getAllPaymentTerm);
// Export the express.Router() instance to be used by server.ts
exports.PaymentTermRoute = router;
//# sourceMappingURL=PaymentTermRoute.js.map