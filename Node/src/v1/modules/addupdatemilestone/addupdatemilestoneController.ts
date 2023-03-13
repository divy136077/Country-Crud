import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { AddUpadateMilestoneUtils } from "./addupdatemilestoneUtils";
import { Constants } from '../../../config/constants';


export class AddUpadateMilestoneController {
  private addUpadateMilestoneUtils: AddUpadateMilestoneUtils = new AddUpadateMilestoneUtils();

  public getAllMilestone = async (req: any, res: Response) => {
    const result = await this.addUpadateMilestoneUtils.getAllMilestone();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));

  }

  /* To create new menu */
  public create = async (req: any, res: Response) => {
    var assignData = await this.addUpadateMilestoneUtils.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Assign project data created successfully", data: assignData });
  }

  /**to update  */

  public update = async (req: any, res: Response) => {
    let payload = req.body;
    const result = await this.addUpadateMilestoneUtils.update(payload, req.params.id);
    if (result) {
      const response = ResponseBuilder.getMobileSuccessResponse(payload, req.t("UPDATE_RECORD_SUCCESS"));
      res.status(Constants.OK).json(response);
    } else {
      res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_RECORD_FAIL"), Constants.BAD_REQ));
    }
  };

  public delete = async (req: any, res: Response) => {
    const result = await this.addUpadateMilestoneUtils.delete(req.params.id);
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("DELETE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("DELETE_RECORD_FAIL")));
    }
  };

  public getOne = async (req: any, res: Response) => {
    let array: any = []
    const result = await this.addUpadateMilestoneUtils.getOne(req.params.id);
    array.push(result)
    return res.status(Constants.OK).json(ResponseBuilder.data(array));
  };

  public toggleStatus = async (req: any, res: Response) => {
    const result = await this.addUpadateMilestoneUtils.toggleStatus(req.body.ids, req.body.IsActive);
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.getMobileSuccessResponse({}, req.t("UPDATE_STATUS_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.getErrorResponse({}, req.t("UPDATE_STATUS_FAIL")));
    }
  }
}

