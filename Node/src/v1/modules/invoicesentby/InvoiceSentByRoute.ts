// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { InvoiceSentByController } from "./InvoicesentbyController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const invoicesentbyController = new InvoiceSentByController();

// public route
router.get("/getallinvoicesentby", invoicesentbyController.getAllInvoiceSentBy);

// Export the express.Router() instance to be used by server.ts
export const InvoiceSentByRoute: Router = router;