// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { CountryController } from "./CountryController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const countryController = new CountryController();

// public route
router.get("/getallcountry", countryController.getAllCountry);

// Export the express.Router() instance to be used by server.ts
export const CountryRoute: Router = router;