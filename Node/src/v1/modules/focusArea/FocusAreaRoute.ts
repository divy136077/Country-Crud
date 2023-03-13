// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { FocusAreaController } from "./FocusAreaController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const focusAreaController = new FocusAreaController() ;

// public route
router.get("/getallfocusarea", focusAreaController.getAllFocusArea);

// Export the express.Router() instance to be used by server.ts
export const FocusAreaRoute : Router = router ;