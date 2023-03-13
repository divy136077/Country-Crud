// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { StateController } from "./StateController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const stateController = new StateController();

// public route
router.get("/:id", stateController.getAllState);

// Export the express.Router() instance to be used by server.ts
export const StateRoute: Router = router;