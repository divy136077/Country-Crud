"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTeamMemberRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../../validate");
const projectteammemberController_1 = require("./projectteammemberController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const projectTeamMemberController = new projectteammemberController_1.ProjectTeamMemberController();
// public route
router.get("/getAllTeamMember", projectTeamMemberController.getAllTeamMember);
// Export the express.Router() instance to be used by server.ts
exports.ProjectTeamMemberRoute = router;
//# sourceMappingURL=projectteammemberRoute.js.map