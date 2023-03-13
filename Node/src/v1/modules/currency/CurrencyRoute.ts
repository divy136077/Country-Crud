// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { CurrencyController } from "./CurrencyController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const currencyController = new CurrencyController();

// public route
router.get("/getallcurrency", currencyController.getAllCurrency);

// Export the express.Router() instance to be used by server.ts
export const CurrencyRoute: Router = router;