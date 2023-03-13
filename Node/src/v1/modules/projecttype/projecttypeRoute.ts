import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectTypeController } from "./projecttypeController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectTypeController = new ProjectTypeController();

// public route
router.get("/getallType", projectTypeController.getAllType);

// Export the express.Router() instance to be used by server.ts
export const ProjectTypeRoute: Router = router;
