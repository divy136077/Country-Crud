// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { paymentMilestoneController } from './paymentMilestoneController';
import { PaymentMilestoneMiddleware } from "./paymentMilestoneMiddleware";

import {
     PaymentMilestonetModel, PaymentMilestoneDeleteModel, PaymentMilestoneStatusModel
} from "./paymentMilestoneModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const pocProjectController = new paymentMilestoneController();
const cmsMiddleware = new PaymentMilestoneMiddleware();


//poc drop  down value for name
// router.get("/pocname", pocProjectController.getPOCName);


// authorization route
router.get("/getOne/:id", cmsMiddleware.IsValidId, pocProjectController.getOne);
router.get("/", pocProjectController.getAll);
router.post("/create", v.validate(PaymentMilestonetModel), pocProjectController.create);
router.put("/update/:id", v.validate(PaymentMilestonetModel), cmsMiddleware.IsValidId, pocProjectController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocProjectController.delete);
router.post("/delete-many", v.validate(PaymentMilestoneDeleteModel), pocProjectController.deleteMany);
router.put("/toggle-status", v.validate(PaymentMilestoneStatusModel), pocProjectController.toggleStatus);





// Export the express.Router() instance to be used by server.ts
export const ProjectMilestoneRoute: Router = router;