import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectStatusFrequencyController } from "./projectstatusfrequencyController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectStatusFrequencyController = new ProjectStatusFrequencyController();

// public route
router.get("/getAllProjectStatusFrequency", projectStatusFrequencyController.getAllProjectStatusFrequency);

// Export the express.Router() instance to be used by server.ts
export const ProjectStatusFrequencyRoute: Router = router;
