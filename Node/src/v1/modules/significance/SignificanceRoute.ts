// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { SignificanceController } from "./SignificanceController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const significanceController = new SignificanceController() ;

// public route
router.get("/getallsignificance", significanceController.getAllSignificance);

// Export the express.Router() instance to be used by server.ts
export const SignificanceRoute : Router = router ;