// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { RoleController } from "./roleController";
import { RoleMiddleware } from "./roleMiddleware";

import {
    RoleModel, RoleDeleteModel, RoleStatusModel
} from "./roleModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const roleController = new RoleController();
const roleMiddleware = new RoleMiddleware();

router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});

// authorization route
router.post("/delete-many", v.validate(RoleDeleteModel),roleMiddleware.checkDBDependency, roleController.deleteMany);
router.post("/toggle-status", v.validate(RoleStatusModel), roleMiddleware.checkDBDependency, roleController.toggleStatus);
router.get("/:id", roleMiddleware.IsValidId, roleController.getOne);
router.post("/search", roleController.getAll);
router.post("/", v.validate(RoleModel), roleMiddleware.IsRoleExists, roleController.create);
router.put("/:id", v.validate(RoleModel), roleMiddleware.IsValidId, roleMiddleware.IsRoleExists, roleController.update);
router.delete("/:id", roleMiddleware.IsValidId, roleMiddleware.checkDBDependency, roleController.delete);


// Export the express.Router() instance to be used by server.ts
export const RoleRoute: Router = router;