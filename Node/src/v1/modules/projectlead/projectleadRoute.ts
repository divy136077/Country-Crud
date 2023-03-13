import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectLeadController } from "./projectleadController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectLeadController = new ProjectLeadController();

// public route
router.get("/getAllLead", projectLeadController.getAllLead);

// Export the express.Router() instance to be used by server.ts
export const ProjectLeadRoute: Router = router;
