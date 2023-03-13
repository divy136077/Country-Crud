"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const roleController_1 = require("./roleController");
const roleMiddleware_1 = require("./roleMiddleware");
const roleModel_1 = require("./roleModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const roleController = new roleController_1.RoleController();
const roleMiddleware = new roleMiddleware_1.RoleMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.post("/delete-many", v.validate(roleModel_1.RoleDeleteModel), roleMiddleware.checkDBDependency, roleController.deleteMany);
router.post("/toggle-status", v.validate(roleModel_1.RoleStatusModel), roleMiddleware.checkDBDependency, roleController.toggleStatus);
router.get("/:id", roleMiddleware.IsValidId, roleController.getOne);
router.post("/search", roleController.getAll);
router.post("/", v.validate(roleModel_1.RoleModel), roleMiddleware.IsRoleExists, roleController.create);
router.put("/:id", v.validate(roleModel_1.RoleModel), roleMiddleware.IsValidId, roleMiddleware.IsRoleExists, roleController.update);
router.delete("/:id", roleMiddleware.IsValidId, roleMiddleware.checkDBDependency, roleController.delete);
// Export the express.Router() instance to be used by server.ts
exports.RoleRoute = router;
//# sourceMappingURL=roleRoute.js.map