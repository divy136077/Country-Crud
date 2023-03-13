// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { IndustryController } from "./IndustryController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const industryController = new IndustryController();

// public route
router.get("/getallindustry", industryController.getAllIndustry);

// Export the express.Router() instance to be used by server.ts
export const IndustryRoute: Router = router;