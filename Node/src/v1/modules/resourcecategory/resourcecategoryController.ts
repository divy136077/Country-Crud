import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ResourceCategoryUtils } from "./resourcecategoryUtils";
import { Constants } from '../../../config/constants';


export class ResourceCategoryController {
  private resourceCategoryUtils: ResourceCategoryUtils = new ResourceCategoryUtils();

  public getAllResourceCategory = async (req: any, res: Response) => {
    const result = await this.resourceCategoryUtils.getAllResourceCategory();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

