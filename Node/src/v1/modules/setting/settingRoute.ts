// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { SettingController } from "./settingController";
import { SettingMiddleware } from "./settingMiddleware";

import {
    SettingModel, SettingDeleteModel, SettingStatusModel
} from "./settingModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const settingController = new SettingController();
const settingMiddleware = new SettingMiddleware();


// authorization route
router.get("/encrypt-records", settingController.encryptUserData);
router.get("/:id", settingMiddleware.IsValidId, settingController.getOne);
router.post("/search", settingController.getAll);
router.post("/", v.validate(SettingModel), settingMiddleware.IsSettingExists, settingController.create);
router.put("/:id", v.validate(SettingModel), settingMiddleware.IsValidId, settingMiddleware.IsSettingExists,  settingController.update);
router.delete("/:id", settingMiddleware.IsValidId, settingController.delete);
router.put("/delete-many", v.validate(SettingDeleteModel), settingController.deleteMany);
router.post("/toggle-status", v.validate(SettingStatusModel), settingController.toggleStatus);


// Export the express.Router() instance to be used by server.ts
export const SettingRoute: Router = router;