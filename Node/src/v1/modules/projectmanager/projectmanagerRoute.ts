import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectManagerController } from "./projectmanagerController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectManagerController = new ProjectManagerController();

// public route
router.get("/getAllManager", projectManagerController.getAllManager);

// Export the express.Router() instance to be used by server.ts
export const ProjectManagerRoute: Router = router;
