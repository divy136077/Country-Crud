// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { GovernanceManagementController } from "./GovernanceManagementController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const governanceManagementController = new GovernanceManagementController() ;

// public route
router.get("/getallgovernancemanagement", governanceManagementController.getAllGovernanceManagement);

// Export the express.Router() instance to be used by server.ts
export const GovernanceManagementRoute : Router = router ;