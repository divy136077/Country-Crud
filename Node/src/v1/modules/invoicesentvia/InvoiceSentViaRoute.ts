// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { InvoiceSentViaController } from "./InvoiceSentViaController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const invoicesentviaController = new InvoiceSentViaController();

// public route
router.get("/getallinvoicesentvia", invoicesentviaController.getAllInvoiceSentVia);

// Export the express.Router() instance to be used by server.ts
export const InvoiceSentViaRoute: Router = router;