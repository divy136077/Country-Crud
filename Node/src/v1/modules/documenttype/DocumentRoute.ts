// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { DocumentTypeController } from "./DocumentController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const documentTypeController = new DocumentTypeController();

// public route
router.get("/getalldocumenttype", documentTypeController.getAllDocumentType);

// Export the express.Router() instance to be used by server.ts
export const DocumentTypeRoute: Router = router;