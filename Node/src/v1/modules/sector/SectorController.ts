import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { SectorUtils } from "./sectorUtils";
import { Constants } from '../../../config/constants';


export class SectorController {
  private sectorUtils: SectorUtils = new SectorUtils();

  public getAllSector = async (req: any, res: Response) => {
      const result = await this.sectorUtils.getAllSector();
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}