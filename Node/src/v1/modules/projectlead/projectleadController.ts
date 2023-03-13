import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectLeadUtils } from "./projectleadUtils";
import { Constants } from '../../../config/constants';


export class ProjectLeadController {
  private projectLeadUtils: ProjectLeadUtils = new ProjectLeadUtils();

  public getAllLead = async (req: any, res: Response) => {
    const result = await this.projectLeadUtils.getAllLead();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
