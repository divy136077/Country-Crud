import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { MilestonePercentageUtils } from "./milestonepercentageUtils";
import { Constants } from '../../../config/constants';


export class MilestonePercentageController {
  private MilestonePercentageUtils: MilestonePercentageUtils = new MilestonePercentageUtils();

  public getAllMilestonePercentage = async (req: any, res: Response) => {
    const result = await this.MilestonePercentageUtils.getAllMilestonePercentage();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

