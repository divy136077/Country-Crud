import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { AssignProjectUtils } from "./assignProjectUtils";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";


export class AssignProjectController {
  private assignProjectUtils: AssignProjectUtils = new AssignProjectUtils();
  private utils: Utils = new Utils();


  /* To create new menu */
  public create = async (req: any, res: Response) => {
    var assignData = await this.assignProjectUtils.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Assign project data created successfully", data: assignData });
  }

  /* To get single record */
  public getOne = async (req: any, res: Response) => {
    const result = await this.assignProjectUtils.getOne(req.params.id);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  };

}

