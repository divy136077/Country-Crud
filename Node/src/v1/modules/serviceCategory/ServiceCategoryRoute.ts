// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ServiceCategoryController } from "./ServiceCategoryController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const serviceCategoryController = new ServiceCategoryController() ;

// public route
router.get("/getallservicecategory", serviceCategoryController.getAllServiceCategory);

// Export the express.Router() instance to be used by server.ts
export const ServiceCategoryRoute : Router = router ;