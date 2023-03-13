import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectTypeUtils } from "./projecttypeUtils";
import { Constants } from '../../../config/constants';


export class ProjectTypeController {
  private projectTypeUtils: ProjectTypeUtils = new ProjectTypeUtils();

  public getAllType = async (req: any, res: Response) => {
      const result = await this.projectTypeUtils.getAllType();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
