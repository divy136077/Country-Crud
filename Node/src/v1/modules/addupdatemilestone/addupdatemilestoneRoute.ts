import { Router } from "express";
import { Validator } from "../../../validate";
import { AddUpadateMilestoneController } from "./addupdatemilestoneController";
import { ClientStatusModel } from "./addupdatemilestoneModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const addUpadateMilestoneController = new AddUpadateMilestoneController();

// public route
router.get("/getAllMilestone", addUpadateMilestoneController.getAllMilestone);
router.post("/create", addUpadateMilestoneController.create);
router.put("/:id", addUpadateMilestoneController.update);
router.delete("/:id", addUpadateMilestoneController.delete);
router.get("/:id", addUpadateMilestoneController.getOne)
router.post("/toggle-status", v.validate(ClientStatusModel), addUpadateMilestoneController.toggleStatus);

// Export the express.Router() instance to be used by server.ts
export const AddUpadateMilestoneRoute: Router = router;
