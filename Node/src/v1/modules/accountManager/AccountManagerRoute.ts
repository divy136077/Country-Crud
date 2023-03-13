// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { AccountManagerController } from "./AccountManagerController";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const accountManagerController = new AccountManagerController() ;

// public route
router.get("/getallaccountmanager", accountManagerController.getAllAccountManager);

// Export the express.Router() instance to be used by server.ts
export const AccountManagerRoute : Router = router ;