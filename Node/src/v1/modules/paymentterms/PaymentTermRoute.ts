// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PaymentTermController } from "./PaymentTermController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const paymenttermController = new PaymentTermController();

// public route
router.get("/getallpaymentterm", paymenttermController.getAllPaymentTerm);

// Export the express.Router() instance to be used by server.ts
export const PaymentTermRoute: Router = router;