// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PracticeHeadController } from "./PracticeHeadController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const practiceHeadController = new PracticeHeadController() ;

// public route
router.get("/getallpracticehead", practiceHeadController.getAllPracticeHead);

// Export the express.Router() instance to be used by server.ts
export const PracticeHeadRoute : Router = router ;