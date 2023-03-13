// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { SettingTypeController } from "./settingtypeController";
import { SettingTypeMiddleware } from "./settingtypeMiddleware";
import {
    SettingTypeModel, SettingTypeDeleteModel, SettingTypeStatusModel
} from "./settingtypeModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const settingTypeController = new SettingTypeController();
const settingTypeMiddleware = new SettingTypeMiddleware();
router.get("/test", (req,res) => {
    res.send("This is a test routing!");
});

// authorization route
router.get("/:id", settingTypeMiddleware.IsValidId, settingTypeController.getOne);
router.get("/get-setting/:slug", settingTypeController.getSetting);
router.post("/search", settingTypeController.getAll);
router.post("/", v.validate(SettingTypeModel), settingTypeMiddleware.IsSettintgTypeExists, settingTypeController.create);
router.put("/:id", v.validate(SettingTypeModel), settingTypeMiddleware.IsValidId, settingTypeMiddleware.IsSettintgTypeExists,  settingTypeController.update);
router.delete("/:id", settingTypeMiddleware.IsValidId, settingTypeMiddleware.checkDBDependency, settingTypeController.delete);
router.post("/delete-many", v.validate(SettingTypeDeleteModel), settingTypeMiddleware.checkDBDependency, settingTypeController.deleteMany);
router.post("/toggle-status", v.validate(SettingTypeStatusModel), settingTypeController.toggleStatus);

// Export the express.Router() instance to be used by server.ts
export const SettingTypeRoute: Router = router;