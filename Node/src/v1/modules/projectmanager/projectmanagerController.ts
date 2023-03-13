import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectManagerUtils } from "./projectmanagerUtils";
import { Constants } from '../../../config/constants';


export class ProjectManagerController {
  private projectManagerUtils: ProjectManagerUtils = new ProjectManagerUtils();

  public getAllManager = async (req: any, res: Response) => {
      const result = await this.projectManagerUtils.getAllManager();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
