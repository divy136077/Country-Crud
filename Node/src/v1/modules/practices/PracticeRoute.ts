// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PracticeController } from "./PracticeController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const practiceController = new PracticeController() ;

// public route
router.get("/getallpractice", practiceController.getAllPractice);

// Export the express.Router() instance to be used by server.ts
export const PracticeRoute : Router = router ;