// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { DomesticController } from "./DomesticController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const domesticController = new DomesticController();

// public route
router.get("/getalldomestic", domesticController.getAllDomestic);

// Export the express.Router() instance to be used by server.ts
export const DomesticRoute: Router = router;