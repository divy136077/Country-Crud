// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PocTypeController } from "./PocTypeController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const pocTypeController = new PocTypeController();

// public route
router.get("/getallpoctype", pocTypeController.getAllPoc);

// Export the express.Router() instance to be used by server.ts
export const PocTypeRoute: Router = router;