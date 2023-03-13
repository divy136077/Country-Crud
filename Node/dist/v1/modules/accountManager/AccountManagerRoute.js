"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountManagerRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const AccountManagerController_1 = require("./AccountManagerController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const accountManagerController = new AccountManagerController_1.AccountManagerController();
// public route
router.get("/getallaccountmanager", accountManagerController.getAllAccountManager);
// Export the express.Router() instance to be used by server.ts
exports.AccountManagerRoute = router;
//# sourceMappingURL=AccountManagerRoute.js.map