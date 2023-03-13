import { Router } from "express";
import { Validator } from "../../../validate";
import { ResourceNameController } from "./resourcenameController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const resourceNameController = new ResourceNameController();

// public route
router.get("/getAllResourceName", resourceNameController.getAllResourceName);

// Export the express.Router() instance to be used by server.ts
export const ResourceNameRoute: Router = router;
