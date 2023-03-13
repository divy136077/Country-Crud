"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSentViaRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const InvoiceSentViaController_1 = require("./InvoiceSentViaController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const invoicesentviaController = new InvoiceSentViaController_1.InvoiceSentViaController();
// public route
router.get("/getallinvoicesentvia", invoicesentviaController.getAllInvoiceSentVia);
// Export the express.Router() instance to be used by server.ts
exports.InvoiceSentViaRoute = router;
//# sourceMappingURL=InvoiceSentViaRoute.js.map