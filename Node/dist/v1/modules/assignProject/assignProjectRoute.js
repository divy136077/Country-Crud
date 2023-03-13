"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignProjectRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const assignProjectController_1 = require("./assignProjectController");
const assignProjectMiddleware_1 = require("./assignProjectMiddleware");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const assignProjectController = new assignProjectController_1.AssignProjectController();
const assignProjectMiddleware = new assignProjectMiddleware_1.AssignProjectMiddleware();
router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});
// authorization route
router.post("/create", assignProjectController.create);
router.get("/:id", assignProjectController.getOne);
// Export the express.Router() instance to be used by server.ts
exports.AssignProjectRoute = router;
//# sourceMappingURL=assignProjectRoute.js.map