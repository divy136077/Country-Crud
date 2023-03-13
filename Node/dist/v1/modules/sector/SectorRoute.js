"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const sectorController_1 = require("./sectorController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const sectorController = new sectorController_1.SectorController();
// public route
router.get("/getallsector", sectorController.getAllSector);
// Export the express.Router() instance to be used by server.ts
exports.SectorRoute = router;
//# sourceMappingURL=SectorRoute.js.map