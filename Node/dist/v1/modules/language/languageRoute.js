"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const languageController_1 = require("./languageController");
const languageMiddleware_1 = require("./languageMiddleware");
const languageModel_1 = require("./languageModel");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const languageController = new languageController_1.LanguageController();
const cmsMiddleware = new languageMiddleware_1.LanguageMiddleware();
// authorization route
router.get("/:id", cmsMiddleware.IsValidId, languageController.getOne);
router.post("/search", languageController.getAll);
router.post("/", v.validate(languageModel_1.LanguageModel), cmsMiddleware.IsLanguageExists, languageController.create);
router.put("/:id", v.validate(languageModel_1.LanguageModel), cmsMiddleware.IsValidId, cmsMiddleware.IsLanguageExists, languageController.update);
router.delete("/:id", cmsMiddleware.IsValidId, languageController.delete);
router.put("/delete-many", v.validate(languageModel_1.LanguageDeleteModel), languageController.deleteMany);
router.put("/toggle-status", v.validate(languageModel_1.LanguageStatusModel), languageController.toggleStatus);
// Export the express.Router() instance to be used by server.ts
exports.LanguageRoute = router;
//# sourceMappingURL=languageRoute.js.map