"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceGenerateFromRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const InvoiceGenerateFromController_1 = require("./InvoiceGenerateFromController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const invoiceGenerateFromController = new InvoiceGenerateFromController_1.InvoiceGenerateFromController();
// public route
router.get("/getallinvoice-generate-from", invoiceGenerateFromController.getAllInvoiceGenerateFrom);
// Export the express.Router() instance to be used by server.ts
exports.InvoiceGenerateFromRoute = router;
//# sourceMappingURL=InvoiceGenerateFromRoute.js.map