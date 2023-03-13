// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { InvoiceGenerateFromController } from "./InvoiceGenerateFromController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const invoiceGenerateFromController = new InvoiceGenerateFromController();

// public route
router.get("/getallinvoice-generate-from",invoiceGenerateFromController.getAllInvoiceGenerateFrom);

// Export the express.Router() instance to be used by server.ts
export const InvoiceGenerateFromRoute: Router = router;