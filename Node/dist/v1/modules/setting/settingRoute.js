"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const settingController_1 = require("./settingController");
const settingMiddleware_1 = require("./settingMiddleware");
const settingModel_1 = require("./settingModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const settingController = new settingController_1.SettingController();
const settingMiddleware = new settingMiddleware_1.SettingMiddleware();
// authorization route
router.get("/encrypt-records", settingController.encryptUserData);
router.get("/:id", settingMiddleware.IsValidId, settingController.getOne);
router.post("/search", settingController.getAll);
router.post("/", v.validate(settingModel_1.SettingModel), settingMiddleware.IsSettingExists, settingController.create);
router.put("/:id", v.validate(settingModel_1.SettingModel), settingMiddleware.IsValidId, settingMiddleware.IsSettingExists, settingController.update);
router.delete("/:id", settingMiddleware.IsValidId, settingController.delete);
router.put("/delete-many", v.validate(settingModel_1.SettingDeleteModel), settingController.deleteMany);
router.post("/toggle-status", v.validate(settingModel_1.SettingStatusModel), settingController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.SettingRoute = router;
//# sourceMappingURL=settingRoute.js.map