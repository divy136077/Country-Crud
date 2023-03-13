import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectStatusUtils } from "./projectstatusUtils";
import { Constants } from '../../../config/constants';


export class ProjectStatusController {
  private projectStatusUtils: ProjectStatusUtils = new ProjectStatusUtils();

  public getAllStatus = async (req: any, res: Response) => {
      const result = await this.projectStatusUtils.getAllStatus();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
