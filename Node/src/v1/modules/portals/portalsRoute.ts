// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { PortalsController } from "./portalsController";
import { PortalsMiddleware } from "./PortalsMiddleware";

import {
    portalModel, PortalsDeleteModel, PortalStatusModel, portalEditModel
} from "./portalsModel";

// Assign router to the express.Router() instance
const router: Router = Router();    
const v: Validator = new Validator();
const portalsController = new PortalsController();
const portalsMiddleware = new PortalsMiddleware();

router.get("/test", (req, res) => {
    res.send("This is a test routing!");
});

// authorization route
router.get("/:id", portalsMiddleware.IsValidId, portalsController.getOne);
router.post("/search", portalsController.getAll);
router.post("/", v.validate(portalModel), portalsMiddleware.IsPortalExists, portalsController.create);
router.put("/:id", v.validate(portalEditModel), portalsMiddleware.IsValidId, portalsMiddleware.IsPortalExists, portalsController.update);
router.delete("/:id", portalsMiddleware.IsValidId, portalsController.delete);
router.post("/delete-many", v.validate(PortalsDeleteModel), portalsController.deleteMany);
router.post("/toggle-status", v.validate(PortalStatusModel), portalsController.toggleStatus);
// router.get("/truncate/acl", moduleController.truncateACL);

// Export the express.Router() instance to be used by server.ts
export const PortalsRoute: Router = router;