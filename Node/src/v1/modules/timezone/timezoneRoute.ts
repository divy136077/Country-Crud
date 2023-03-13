import { Router } from "express";
import { Validator } from "../../../validate";
import { TimeZoneController } from "./timezoneController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const timeZoneController = new TimeZoneController();

// public route
router.get("/getAllTimeZone", timeZoneController.getAllTimeZone);

// Export the express.Router() instance to be used by server.ts
export const TimeZoneRoute: Router = router;
