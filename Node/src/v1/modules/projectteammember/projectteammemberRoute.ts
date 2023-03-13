import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectTeamMemberController } from "./projectteammemberController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectTeamMemberController = new ProjectTeamMemberController();

// public route
router.get("/getAllTeamMember", projectTeamMemberController.getAllTeamMember);

// Export the express.Router() instance to be used by server.ts
export const ProjectTeamMemberRoute: Router = router;
