// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ModuleController } from "./moduleController";
import { ModuleMiddleware } from "./moduleMiddleware";

import {
    ModuleModel, ModuleDeleteModel, ModuleStatusModel
} from "./moduleModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const moduleController = new ModuleController();
const moduleMiddleware = new ModuleMiddleware();

router.get("/test", (req,res) => {
    res.send("This is a test routing!");
});

// authorization route
router.get("/:id", moduleMiddleware.IsValidId, moduleController.getOne);
router.get("/getmodule/:id", moduleController.getmodule);
router.post("/search", moduleController.getAll);
router.post("/", v.validate(ModuleModel), moduleMiddleware.IsModuleExists, moduleController.create);
router.put("/:id", v.validate(ModuleModel), moduleMiddleware.IsValidId, moduleMiddleware.IsModuleExists,  moduleController.update);
router.delete("/:id", moduleMiddleware.IsValidId, moduleMiddleware.checkDBDependency, moduleController.delete);
router.post("/delete-many", v.validate(ModuleDeleteModel),moduleMiddleware.checkDBDependency, moduleController.deleteMany);
router.post("/toggle-status", v.validate(ModuleStatusModel), moduleMiddleware.checkDBDependency, moduleController.toggleStatus);
router.get("/truncate/acl", moduleController.truncateACL);

// Export the express.Router() instance to be used by server.ts
export const ModuleRoute: Router = router;