// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { RightsController } from "./rightsController";
import { RightsMiddleware } from "./rightsMiddleware";

import {
    RightsModel, RightsDeleteModel, RightsStatusModel
} from "./rightsModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const rightsController = new RightsController();
const rightsMiddleware = new RightsMiddleware();

router.get("/test", (req,res) => {
    res.send("This is a test routing!");   
});

// authorization route
router.get("/:id", rightsMiddleware.IsValidId, rightsController.getOne);
router.post("/search", rightsController.getAll);
router.post("/", v.validate(RightsModel), rightsMiddleware.IsRightsExists, rightsController.create);
router.put("/:id", v.validate(RightsModel), rightsMiddleware.IsValidId, rightsMiddleware.IsRightsExists,  rightsController.update);
router.delete("/:id", rightsMiddleware.IsValidId, rightsMiddleware.checkDBDependency, rightsController.delete);
router.post("/delete-many", v.validate(RightsDeleteModel), rightsMiddleware.checkDBDependency, rightsController.deleteMany);
router.post("/toggle-status", v.validate(RightsStatusModel), rightsMiddleware.checkDBDependency, rightsController.toggleStatus);


// Export the express.Router() instance to be used by server.ts
export const RightsRoute: Router = router;