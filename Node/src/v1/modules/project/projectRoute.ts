// Import only what we need from express
import { Router } from "express";
import { ProjectController } from "./projectController";
import { Validator } from "../../../validate";


import { Middleware } from "../../../middleware";
import { ProjectMiddleware } from './projectMiddleware';
import {ProjectModel} from './projectModel'

// const Web3 = require('web3');
// Assign router to the express.Router() instance
const router: Router = Router();
const middleware = new Middleware();
const projectController = new ProjectController()
const v: Validator = new Validator();
const projectMiddleware = new ProjectMiddleware()



//post project details
router.post("/create",v.validate(ProjectModel), projectMiddleware.fileupload , projectController.create)



// router.get('/getpoclist',projectController.getpocList)


export const ProjectRoute: Router = router;