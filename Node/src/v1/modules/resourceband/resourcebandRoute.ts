import { Router } from "express";
import { Validator } from "../../../validate";
import { ResourceBandController } from "./resourcebandController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const resourceBandController = new ResourceBandController();

// public route
router.get("/getAllResourceBand", resourceBandController.getAllResourceBand);

// Export the express.Router() instance to be used by server.ts
export const ResourceBandRoute: Router = router;
