"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocProjectRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const pocProjectController_1 = require("./pocProjectController");
const pocProjectMiddleware_1 = require("./pocProjectMiddleware");
const pocProjectModel_1 = require("./pocProjectModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const pocProjectController = new pocProjectController_1.PocProjectController();
const cmsMiddleware = new pocProjectMiddleware_1.PocProjectMiddleware();
//poc drop  down value for name
router.get("/pocname", pocProjectController.getPOCName);
// authorization route
router.get("/getOne/:id", cmsMiddleware.IsValidId, pocProjectController.getOne);
router.get("/", pocProjectController.getAll);
router.post("/create", v.validate(pocProjectModel_1.PocProjectModel), pocProjectController.create);
router.put("/update/:id", v.validate(pocProjectModel_1.PocProjectModel), cmsMiddleware.IsValidId, pocProjectController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocProjectController.delete);
router.post("/delete-many", v.validate(pocProjectModel_1.PocProjectDeleteModel), pocProjectController.deleteMany);
router.put("/toggle-status", v.validate(pocProjectModel_1.PocProjectStatusModel), pocProjectController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.PocProjectRoute = router;
//# sourceMappingURL=pocProjectRoute.js.map