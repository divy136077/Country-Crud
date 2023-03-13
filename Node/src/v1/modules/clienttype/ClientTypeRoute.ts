// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ClientTypeController } from "./ClientTypeController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const clienttypeController = new ClientTypeController();

// public route
router.get("/getallclienttype", clienttypeController.getAllClientType);

// Export the express.Router() instance to be used by server.ts
export const ClientTypeRoute: Router = router;