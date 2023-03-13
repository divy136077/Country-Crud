// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { WorkOrderTypeController } from "./WorkOrderTypeController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const workOrderTypeController = new WorkOrderTypeController() ;

// public route
router.get("/getallworkordertype", workOrderTypeController.getAllWorkOrderType);

// Export the express.Router() instance to be used by server.ts
export const WorkOrderTypeRoute : Router = router ;