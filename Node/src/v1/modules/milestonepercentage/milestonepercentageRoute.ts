import { Router } from "express";
import { Validator } from "../../../validate";
import { MilestonePercentageController } from "./milestonepercentageController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const milestonePercentageController = new MilestonePercentageController();

// public route
router.get("/getAllMilestonePercentage", milestonePercentageController.getAllMilestonePercentage);

// Export the express.Router() instance to be used by server.ts
export const MilestonePercentageRoute: Router = router;
