import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectStatusController } from "./projectststusController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectStatusController = new ProjectStatusController();

// public route
router.get("/getallStatus", projectStatusController.getAllStatus);

// Export the express.Router() instance to be used by server.ts
export const ProjectStatusRoute: Router = router;
