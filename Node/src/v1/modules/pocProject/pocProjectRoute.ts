// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PocProjectController } from './pocProjectController';
import { PocProjectMiddleware } from "./pocProjectMiddleware";

import {
     PocProjectDeleteModel, PocProjectStatusModel, PocProjectModel
} from "./pocProjectModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const pocProjectController = new PocProjectController();
const cmsMiddleware = new PocProjectMiddleware();


//poc drop  down value for name
router.get("/pocname", pocProjectController.getPOCName);


// authorization route
router.get("/getOne/:id",cmsMiddleware.IsValidId, pocProjectController.getOne);
router.get("/", pocProjectController.getAll);
router.post("/create", v.validate(PocProjectModel),  pocProjectController.create);
router.put("/update/:id", v.validate(PocProjectModel), cmsMiddleware.IsValidId,  pocProjectController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocProjectController.delete);
router.post("/delete-many", v.validate(PocProjectDeleteModel), pocProjectController.deleteMany);
router.put("/toggle-status", v.validate(PocProjectStatusModel), pocProjectController.toggleStatus);





// Export the express.Router() instance to be used by server.ts
export const PocProjectRoute: Router = router;