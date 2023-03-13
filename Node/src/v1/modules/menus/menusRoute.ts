// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { MenusController } from "./menusController";
import { MenusMiddleware } from "./menusMiddleware";

import {
    MenuStatusModel, MenusModel, MenuDeleteModel
} from "./menusModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const menusController = new MenusController();
const menusMiddleware = new MenusMiddleware();

router.get("/test", (req,res) => {
    res.send("This is a test routing!");
});

// authorization route
router.post("/toggle-status", v.validate(MenuStatusModel), menusMiddleware.checkDBDependency, menusController.toggleStatus);
router.post("/delete-many", v.validate(MenuDeleteModel), menusMiddleware.checkDBDependency, menusController.deleteMany);
router.get("/:id", menusMiddleware.IsValidId, menusController.getOne);
router.post("/menu-list", menusController.getBackendMenu);
router.post("/search", menusController.getAll);
router.post("/", v.validate(MenusModel),  menusController.create);
router.put("/:id", v.validate(MenusModel), menusMiddleware.IsValidId, menusMiddleware.IsModuleExists,  menusController.update);
router.delete("/:id", menusMiddleware.IsValidId, menusMiddleware.checkDBDependency, menusController.delete);

// Export the express.Router() instance to be used by server.ts
export const MenuRoute: Router = router;