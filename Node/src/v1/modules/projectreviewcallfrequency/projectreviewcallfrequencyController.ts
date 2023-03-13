import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ProjectReviewCallFrequencyUtils } from "./projectreviewcallfrequencyUtils";
import { Constants } from '../../../config/constants';


export class ProjectReviewCallFrequencyController {
  private projectReviewCallFrequencyUtils: ProjectReviewCallFrequencyUtils = new ProjectReviewCallFrequencyUtils();

  public getAllCallFrequency = async (req: any, res: Response) => {
      const result = await this.projectReviewCallFrequencyUtils.getAllCallFrequency();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}
