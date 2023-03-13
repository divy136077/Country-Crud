import { Router } from "express";
import { Validator } from "../../../validate";
import { ProjectReviewCallFrequencyController } from "./projectreviewcallfrequencyController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const projectReviewCallFrequencyController = new ProjectReviewCallFrequencyController();

// public route
router.get("/getAllCallFrequency", projectReviewCallFrequencyController.getAllCallFrequency);

// Export the express.Router() instance to be used by server.ts
export const ProjectReviewCallFrequencyRoute: Router = router;
