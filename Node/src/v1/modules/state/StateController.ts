import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { StateUtils } from "./StateUtils";
import { Constants } from '../../../config/constants';


export class StateController {
  private stateUtils: StateUtils = new StateUtils();

  public getAllState = async (req: any, res: Response) => {
      const result = await this.stateUtils.getAllState(req.params.id);
      return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}