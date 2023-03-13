// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { GeographyController } from "./GeographyController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const geographyController = new GeographyController() ;

// public route
router.get("/getallgeography", geographyController.getAllGeography);

// Export the express.Router() instance to be used by server.ts
export const GeographyRoute : Router = router ;