// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { LanguageController } from "./languageController";
import { LanguageMiddleware } from "./languageMiddleware";

import {
    LanguageModel, LanguageDeleteModel, LanguageStatusModel
} from "./languageModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const languageController = new LanguageController();
const cmsMiddleware = new LanguageMiddleware();


// authorization route
router.get("/:id", cmsMiddleware.IsValidId, languageController.getOne);
router.post("/search", languageController.getAll);
router.post("/", v.validate(LanguageModel), cmsMiddleware.IsLanguageExists, languageController.create);
router.put("/:id", v.validate(LanguageModel), cmsMiddleware.IsValidId, cmsMiddleware.IsLanguageExists,  languageController.update);
router.delete("/:id", cmsMiddleware.IsValidId, languageController.delete);
router.put("/delete-many", v.validate(LanguageDeleteModel), languageController.deleteMany);
router.put("/toggle-status", v.validate(LanguageStatusModel), languageController.toggleStatus);


// Export the express.Router() instance to be used by server.ts
export const LanguageRoute: Router = router;