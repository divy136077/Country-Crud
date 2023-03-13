// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { SectorController } from "./sectorController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const sectorController = new SectorController();

// public route
router.get("/getallsector", sectorController.getAllSector);

// Export the express.Router() instance to be used by server.ts
export const SectorRoute: Router = router;