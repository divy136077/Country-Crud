// Import only what we need from express
import { Router } from "express";
import { CompanyController } from "./companyController";
import { Validator } from "../../../validate";
import { CompanyModel } from './companyModel'


import { Middleware } from "../../../middleware";
import { CompanyMiddleware } from './companyMiddleware';
// const Web3 = require('web3');
// Assign router to the express.Router() instance
const router: Router = Router();
const middleware = new Middleware();
const companyController = new CompanyController()
const v: Validator = new Validator();
const companyMiddleware = new CompanyMiddleware()


// router.get("/demo", (req, res) => {
//     res.send("This is a company route!");
// });


router.get("/getcompany/:id",companyController.getCompanyList)




//get all company details
router.get("/search", companyController.getAll)

//get company by id
router.get('/:id',companyMiddleware.IsValidId,companyMiddleware.IsCompanyExists,companyController.getOne)

//post company details
router.post("/", v.validate(CompanyModel), companyController.create)

//update company details
router.put("/:id",companyMiddleware.IsValidId, companyMiddleware.IsCompanyExists,companyController.update)

//inactive company details
router.post("/toggle-status",companyController.toggleStatus)

//delete company details
router.delete("/:id",companyMiddleware.IsValidId,companyMiddleware.IsCompanyExists,companyController.delete)


//delete many company
// router.put("/delete-many", companyController.deleteMany);





export const CompanyRoute: Router = router;