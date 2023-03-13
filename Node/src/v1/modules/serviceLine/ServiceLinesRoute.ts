// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ServiceLinesController } from "./ServiceLinesController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const serviceLinesController = new ServiceLinesController() ;

// public route
router.get("/getallservicelines", serviceLinesController.getAllServiceLine);

// Export the express.Router() instance to be used by server.ts
export const ServiceLinesRoute : Router = router ;