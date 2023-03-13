import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ResourceBandUtils } from "./resourcebandUtils";
import { Constants } from '../../../config/constants';


export class ResourceBandController {
  private resourceBandUtils: ResourceBandUtils = new ResourceBandUtils();

  public getAllResourceBand = async (req: any, res: Response) => {
    const result = await this.resourceBandUtils.getAllResourceBand();
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}

