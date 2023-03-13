"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const DocumentController_1 = require("./DocumentController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const documentTypeController = new DocumentController_1.DocumentTypeController();
// public route
router.get("/getalldocumenttype", documentTypeController.getAllDocumentType);
// Export the express.Router() instance to be used by server.ts
exports.DocumentTypeRoute = router;
//# sourceMappingURL=DocumentRoute.js.map