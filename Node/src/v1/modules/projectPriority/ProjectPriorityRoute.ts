// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectPriorityController } from "./ProjectPriorityController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectPriorityController = new ProjectPriorityController() ;

// public route
router.get("/getallprojectpriority", projectPriorityController.getAllProjectPriority);

// Export the express.Router() instance to be used by server.ts
export const projectPriorityRoute : Router = router ;