"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const companyController_1 = require("./companyController");
const validate_1 = require("../../../validate");
const companyModel_1 = require("./companyModel");
const middleware_1 = require("../../../middleware");
const companyMiddleware_1 = require("./companyMiddleware");
// const Web3 = require('web3');
// Assign router to the express.Router() instance
const router = express_1.Router();
const middleware = new middleware_1.Middleware();
const companyController = new companyController_1.CompanyController();
const v = new validate_1.Validator();
const companyMiddleware = new companyMiddleware_1.CompanyMiddleware();
// router.get("/demo", (req, res) => {
//     res.send("This is a company route!");
// });
router.get("/getcompany/:id", companyController.getCompanyList);
//get all company details
router.get("/search", companyController.getAll);
//get company by id
router.get('/:id', companyMiddleware.IsValidId, companyMiddleware.IsCompanyExists, companyController.getOne);
//post company details
router.post("/", v.validate(companyModel_1.CompanyModel), companyController.create);
//update company details
router.put("/:id", companyMiddleware.IsValidId, companyMiddleware.IsCompanyExists, companyController.update);
//inactive company details
router.post("/toggle-status", companyController.toggleStatus);
//delete company details
router.delete("/:id", companyMiddleware.IsValidId, companyMiddleware.IsCompanyExists, companyController.delete);
//delete many company
// router.put("/delete-many", companyController.deleteMany);
exports.CompanyRoute = router;
//# sourceMappingURL=companyRoute.js.map