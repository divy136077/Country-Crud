"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocClientRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const pocClientController_1 = require("./pocClientController");
const pocClientMiddleware_1 = require("./pocClientMiddleware");
const pocClientModel_1 = require("./pocClientModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const pocClientController = new pocClientController_1.PocClientController();
const cmsMiddleware = new pocClientMiddleware_1.PocClientMiddleware();
// router.get("/getpocname",pocClientController.getPOCName)
// authorization route
router.get("/:id", cmsMiddleware.IsValidId, pocClientController.getOne);
router.get("/getall/:id", pocClientController.getAll);
router.post("/", v.validate(pocClientModel_1.PocClientModel), pocClientController.create);
router.put("/:id", v.validate(pocClientModel_1.PocClientModel), cmsMiddleware.IsValidId, pocClientController.update);
router.delete("/:id", cmsMiddleware.IsValidId, pocClientController.delete);
router.post("/delete-many", v.validate(pocClientModel_1.PocClientDeleteModel), pocClientController.deleteMany);
router.post("/toggle-status", v.validate(pocClientModel_1.PocClientStatusModel), pocClientController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.PocClientRoute = router;
//# sourceMappingURL=pocClientRoute.js.map