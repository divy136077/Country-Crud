"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightsRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const rightsController_1 = require("./rightsController");
const rightsMiddleware_1 = require("./rightsMiddleware");
const rightsModel_1 = require("./rightsModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const rightsController = new rightsController_1.RightsController();
const rightsMiddleware = new rightsMiddleware_1.RightsMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.get("/:id", rightsMiddleware.IsValidId, rightsController.getOne);
router.post("/search", rightsController.getAll);
router.post("/", v.validate(rightsModel_1.RightsModel), rightsMiddleware.IsRightsExists, rightsController.create);
router.put("/:id", v.validate(rightsModel_1.RightsModel), rightsMiddleware.IsValidId, rightsMiddleware.IsRightsExists, rightsController.update);
router.delete("/:id", rightsMiddleware.IsValidId, rightsMiddleware.checkDBDependency, rightsController.delete);
router.post("/delete-many", v.validate(rightsModel_1.RightsDeleteModel), rightsMiddleware.checkDBDependency, rightsController.deleteMany);
router.post("/toggle-status", v.validate(rightsModel_1.RightsStatusModel), rightsMiddleware.checkDBDependency, rightsController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.RightsRoute = router;
//# sourceMappingURL=rightsRoute.js.map