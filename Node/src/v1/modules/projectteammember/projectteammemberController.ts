import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectTeamMemberUtils } from "./projectteammemberUtils";
import { Constants } from '../../../config/constants';


export class ProjectTeamMemberController {
  private projectTeamMemberUtils: ProjectTeamMemberUtils = new ProjectTeamMemberUtils();

  public getAllTeamMember = async (req: any, res: Response) => {
    const result = await this.projectTeamMemberUtils.getAllTeamMember();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
