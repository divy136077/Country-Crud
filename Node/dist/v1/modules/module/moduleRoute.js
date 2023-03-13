"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const moduleController_1 = require("./moduleController");
const moduleMiddleware_1 = require("./moduleMiddleware");
const moduleModel_1 = require("./moduleModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const moduleController = new moduleController_1.ModuleController();
const moduleMiddleware = new moduleMiddleware_1.ModuleMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.get("/:id", moduleMiddleware.IsValidId, moduleController.getOne);
router.get("/getmodule/:id", moduleController.getmodule);
router.post("/search", moduleController.getAll);
router.post("/", v.validate(moduleModel_1.ModuleModel), moduleMiddleware.IsModuleExists, moduleController.create);
router.put("/:id", v.validate(moduleModel_1.ModuleModel), moduleMiddleware.IsValidId, moduleMiddleware.IsModuleExists, moduleController.update);
router.delete("/:id", moduleMiddleware.IsValidId, moduleMiddleware.checkDBDependency, moduleController.delete);
router.post("/delete-many", v.validate(moduleModel_1.ModuleDeleteModel), moduleMiddleware.checkDBDependency, moduleController.deleteMany);
router.post("/toggle-status", v.validate(moduleModel_1.ModuleStatusModel), moduleMiddleware.checkDBDependency, moduleController.toggleStatus);
router.get("/truncate/acl", moduleController.truncateACL);
// Export the express.Router() instance to be used by server.ts
exports.ModuleRoute = router;
//# sourceMappingURL=moduleRoute.js.map