// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ClientGroupMiddleware } from "./ClientGroupMiddleware";
import { ClientGroupController } from "./ClientGroupController";
const clientgroupMiddleware = new ClientGroupMiddleware();


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const clientgroupController = new ClientGroupController();

// public route
router.get("/:id", clientgroupMiddleware.IsValidId, clientgroupController.getOne);

// Export the express.Router() instance to be used by server.ts
export const ClientGroupRoute: Router = router;