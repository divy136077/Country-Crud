"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const menusController_1 = require("./menusController");
const menusMiddleware_1 = require("./menusMiddleware");
const menusModel_1 = require("./menusModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const menusController = new menusController_1.MenusController();
const menusMiddleware = new menusMiddleware_1.MenusMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.post("/toggle-status", v.validate(menusModel_1.MenuStatusModel), menusMiddleware.checkDBDependency, menusController.toggleStatus);
router.post("/delete-many", v.validate(menusModel_1.MenuDeleteModel), menusMiddleware.checkDBDependency, menusController.deleteMany);
router.get("/:id", menusMiddleware.IsValidId, menusController.getOne);
router.post("/menu-list", menusController.getBackendMenu);
router.post("/search", menusController.getAll);
router.post("/", v.validate(menusModel_1.MenusModel), menusController.create);
router.put("/:id", v.validate(menusModel_1.MenusModel), menusMiddleware.IsValidId, menusMiddleware.IsModuleExists, menusController.update);
router.delete("/:id", menusMiddleware.IsValidId, menusMiddleware.checkDBDependency, menusController.delete);
// Export the express.Router() instance to be used by server.ts
exports.MenuRoute = router;
//# sourceMappingURL=menusRoute.js.map