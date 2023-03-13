"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const projectController_1 = require("./projectController");
const validate_1 = require("../../../validate");
const middleware_1 = require("../../../middleware");
const projectMiddleware_1 = require("./projectMiddleware");
const projectModel_1 = require("./projectModel");
// const Web3 = require('web3');
// Assign router to the express.Router() instance
const router = express_1.Router();
const middleware = new middleware_1.Middleware();
const projectController = new projectController_1.ProjectController();
const v = new validate_1.Validator();
const projectMiddleware = new projectMiddleware_1.ProjectMiddleware();
//post project details
router.post("/create", v.validate(projectModel_1.ProjectModel), projectMiddleware.fileupload, projectController.create);
// router.get('/getpoclist',projectController.getpocList)
exports.ProjectRoute = router;
//# sourceMappingURL=projectRoute.js.map