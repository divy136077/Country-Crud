"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const CountryController_1 = require("./CountryController");
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const countryController = new CountryController_1.CountryController();
// public route
router.get("/getallcountry", countryController.getAllCountry);
// Export the express.Router() instance to be used by server.ts
exports.CountryRoute = router;
//# sourceMappingURL=CountryRoute.js.map