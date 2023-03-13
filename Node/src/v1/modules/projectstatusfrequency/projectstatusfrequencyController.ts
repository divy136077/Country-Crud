import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectStatusFrequencyUtils } from "./projectstatusfrequencyUtils";
import { Constants } from '../../../config/constants';


export class ProjectStatusFrequencyController {
  private projectStatusFrequencyUtils: ProjectStatusFrequencyUtils = new ProjectStatusFrequencyUtils();

  public getAllProjectStatusFrequency = async (req: any, res: Response) => {
    const result = await this.projectStatusFrequencyUtils.getAllProjectStatusFrequency();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

