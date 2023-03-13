// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ClientController } from "./ClientController";
import { ClientMiddleware } from "./ClientMiddleware";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const clientController = new ClientController() ;
const clientMiddleware = new ClientMiddleware() ;

// public route
router.post("/addclient", clientController.create);
router.post("/addcompany", clientController.create);
router.get("/", clientController.getClientGroup);
router.get("/:id", clientMiddleware.IsValidId, clientController.getOne);

// Export the express.Router() instance to be used by server.ts
export const ClientRoute : Router = router ;