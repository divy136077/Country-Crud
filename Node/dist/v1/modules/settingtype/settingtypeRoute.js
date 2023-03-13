"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingTypeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const settingtypeController_1 = require("./settingtypeController");
const settingtypeMiddleware_1 = require("./settingtypeMiddleware");
const settingtypeModel_1 = require("./settingtypeModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const settingTypeController = new settingtypeController_1.SettingTypeController();
const settingTypeMiddleware = new settingtypeMiddleware_1.SettingTypeMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.get("/:id", settingTypeMiddleware.IsValidId, settingTypeController.getOne);
router.get("/get-setting/:slug", settingTypeController.getSetting);
router.post("/search", settingTypeController.getAll);
router.post("/", v.validate(settingtypeModel_1.SettingTypeModel), settingTypeMiddleware.IsSettintgTypeExists, settingTypeController.create);
router.put("/:id", v.validate(settingtypeModel_1.SettingTypeModel), settingTypeMiddleware.IsValidId, settingTypeMiddleware.IsSettintgTypeExists, settingTypeController.update);
router.delete("/:id", settingTypeMiddleware.IsValidId, settingTypeMiddleware.checkDBDependency, settingTypeController.delete);
router.post("/delete-many", v.validate(settingtypeModel_1.SettingTypeDeleteModel), settingTypeMiddleware.checkDBDependency, settingTypeController.deleteMany);
router.post("/toggle-status", v.validate(settingtypeModel_1.SettingTypeStatusModel), settingTypeController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.SettingTypeRoute = router;
//# sourceMappingURL=settingtypeRoute.js.map