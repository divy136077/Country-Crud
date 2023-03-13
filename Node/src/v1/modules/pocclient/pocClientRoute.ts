// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PocClientController } from "./pocClientController";
import { PocClientMiddleware } from "./pocClientMiddleware";

import {
    PocClientModel, PocClientDeleteModel, PocClientStatusModel
} from "./pocClientModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const pocClientController = new PocClientController();
const cmsMiddleware = new PocClientMiddleware();

// router.get("/getpocname",pocClientController.getPOCName)


// authorization route
router.get("/:id",cmsMiddleware.IsValidId, pocClientController.getOne);
router.get("/getall/:id", pocClientController.getAll);
router.post("/", v.validate(PocClientModel), pocClientController.create);
router.put("/:id", v.validate(PocClientModel), cmsMiddleware.IsValidId,  pocClientController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocClientController.delete);
router.post("/delete-many", v.validate(PocClientDeleteModel), pocClientController.deleteMany);
router.post("/toggle-status", v.validate(PocClientStatusModel), pocClientController.toggleStatus);



// Export the express.Router() instance to be used by server.ts
export const PocClientRoute: Router = router;