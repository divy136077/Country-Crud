"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSentByRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const InvoicesentbyController_1 = require("./InvoicesentbyController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const invoicesentbyController = new InvoicesentbyController_1.InvoiceSentByController();
// public route
router.get("/getallinvoicesentby", invoicesentbyController.getAllInvoiceSentBy);
// Export the express.Router() instance to be used by server.ts
exports.InvoiceSentByRoute = router;
//# sourceMappingURL=InvoicesentbyRoute.js.map