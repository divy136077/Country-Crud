import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';
import { ClientUtils } from "./ClientUtils";
const bcrypt = require('bcryptjs');

export class ClientController {
    private clientUtils : ClientUtils = new ClientUtils();

    public create = async(req:any, res:Response) =>{
        var file = req.file ;
        var input = req.body ;
        console.log(input);
        console.log(file)
       
        const result = await this.clientUtils.AddNewClient(input);

        if(result){
          return  res.status(Constants.OK).json(ResponseBuilder.successMessage("Record added successfully!"));
        }
        return res.status(Constants.INTERNAL_SERVER).json(ResponseBuilder.errorMessage("Something went wrong!"));
    }

    public getOne = async (req: any, res: Response) => {
        const result = await this.clientUtils.getOne(req.params.id);
        if(result){
          const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
          res.status(Constants.OK).json(response);
        }else{
          res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
        }
      }

      public getClientGroup = async (req:any, res:Response) => {
        const result = await this.clientUtils.ClientGroupList();

        if(result){
            const response = ResponseBuilder.getMobileSuccessResponse(result, req.t("SUCCESS"));
            res.status(Constants.OK).json(response);
          }else{
            res.status(Constants.NOT_FOUND).json(ResponseBuilder.getErrorResponse({}, req.t("NO_RECORD_FOUND"), Constants.NOT_FOUND));
          }
      }
}