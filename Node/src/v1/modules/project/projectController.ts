import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectUtils } from './projectUtils';
import * as Sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";



export class ProjectController {
    private ProjectUtils = new ProjectUtils()

    //insert company
    public create = async (req, res) => {
        console.log(req)
        try {
            const projectDetails = JSON.parse(req.body.allData)

            // const companyDetails = req.body.PocProject


            const result = await this.ProjectUtils.create(projectDetails, req)
            console.log("result", result)
            res.json(result)


        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);

        }

    }

}

