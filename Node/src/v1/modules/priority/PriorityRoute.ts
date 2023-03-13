// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PriorityController } from "./PriorityController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const priorityController = new PriorityController() ;

// public route
router.get("/getallpriority", priorityController.getAllPriority);

// Export the express.Router() instance to be used by server.ts
export const PriorityRoute : Router = router ;