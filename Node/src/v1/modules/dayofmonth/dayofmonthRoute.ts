import { Router } from "express";
import { Validator } from "../../../validate";
import { DayOfMonthController } from "./dayofmonthController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const dayOfMonthController = new DayOfMonthController();

// public route
router.get("/getAllDayOfMonth", dayOfMonthController.getAllDayOfMonth);

// Export the express.Router() instance to be used by server.ts
export const DayOfMonthRoute: Router = router;
