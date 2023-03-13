// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { TaxController } from "./TaxController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const taxController = new TaxController();

// public route
router.get("/getalltax", taxController.getAllTax);

// Export the express.Router() instance to be used by server.ts
export const TaxRoute: Router = router;