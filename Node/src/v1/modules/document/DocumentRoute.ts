// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { DocumentController } from "./DocumentController";
import { DocumentMiddleware } from "./DocumentMiddleware";

import {
    DocumentModel
} from "./DocumentModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const documentController = new DocumentController();
const documentMiddleware = new DocumentMiddleware();


// authorization route
router.get("/:id", documentMiddleware.IsValidId, documentController.getOne);
router.delete("/:id", documentController.delete);
router.get("/", documentController.getAll);
router.post("/create", v.validate(DocumentModel), documentMiddleware.fileupload, documentController.create);

// Export the express.Router() instance to be used by server.ts
export const DocumentRoute: Router = router;