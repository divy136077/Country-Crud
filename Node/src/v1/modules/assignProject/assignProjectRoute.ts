// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { AssignProjectController } from "./assignProjectController";
import { AssignProjectMiddleware } from "./assignProjectMiddleware";


// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const assignProjectController = new AssignProjectController();
const assignProjectMiddleware = new AssignProjectMiddleware();

router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});

// authorization route
router.post("/create", assignProjectController.create);
router.get("/:id", assignProjectController.getOne)

// Export the express.Router() instance to be used by server.ts
export const AssignProjectRoute: Router = router;