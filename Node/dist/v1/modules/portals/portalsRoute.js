"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalsRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const portalsController_1 = require("./portalsController");
const PortalsMiddleware_1 = require("./PortalsMiddleware");
const portalsModel_1 = require("./portalsModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const portalsController = new portalsController_1.PortalsController();
const portalsMiddleware = new PortalsMiddleware_1.PortalsMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.get("/:id", portalsMiddleware.IsValidId, portalsController.getOne);
router.post("/search", portalsController.getAll);
router.post("/", v.validate(portalsModel_1.portalModel), portalsMiddleware.IsPortalExists, portalsController.create);
router.put("/:id", v.validate(portalsModel_1.portalEditModel), portalsMiddleware.IsValidId, portalsMiddleware.IsPortalExists, portalsController.update);
router.delete("/:id", portalsMiddleware.IsValidId, portalsController.delete);
router.post("/delete-many", v.validate(portalsModel_1.PortalsDeleteModel), portalsController.deleteMany);
router.post("/toggle-status", v.validate(portalsModel_1.PortalStatusModel), portalsController.toggleStatus);
// router.get("/truncate/acl", moduleController.truncateACL);
// Export the express.Router() instance to be used by server.ts
exports.PortalsRoute = router;
//# sourceMappingURL=portalsRoute.js.map