// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { BankDetailController } from "./BankDetailController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const bankDetailController = new BankDetailController();

// public route
router.get("/getallbank-detail", bankDetailController.getAllBankDetail);

// Export the express.Router() instance to be used by server.ts
export const BankDetailRoute: Router = router;