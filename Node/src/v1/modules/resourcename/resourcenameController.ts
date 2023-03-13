import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ResourceNameUtils } from "./resourcenameUtils";
import { Constants } from '../../../config/constants';


export class ResourceNameController {
  private resourceNameUtils: ResourceNameUtils = new ResourceNameUtils();

  public getAllResourceName = async (req: any, res: Response) => {
    const result = await this.resourceNameUtils.getAllResourceName();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

