import { Router } from "express";
import { Validator } from "../../../validate";
import { ResourceCategoryController } from "./resourcecategoryController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const resourceCategoryController = new ResourceCategoryController();

// public route
router.get("/getAllResourceCategory", resourceCategoryController.getAllResourceCategory);

// Export the express.Router() instance to be used by server.ts
export const ResourceCategoryRoute: Router = router;
