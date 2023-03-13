import { Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { RoleUtils } from "./roleUtils";
import * as l10n from "jm-ez-l10n";
import { Constants } from '../../../config/constants';
import { rabbit } from "../../../rabbitmq";
import { Utils } from "../../../helpers/utils";

export class RoleController {
  private roleUtils: RoleUtils = new RoleUtils();
  private utils: Utils = new Utils();

  /**Create a new role*/
  public create = async (req: any, res: Response) => {
    try {
      let payload = req.body;
      const user_id = await this.utils.authToken(req.headers.authorization);
      payload.created_by = user_id;
      const portal_id = payload.portal_id;

      const result = await this.roleUtils.create(payload);
      payload.id = payload.role_id = result.insertId;

      payload.portal_id = portal_id;
      const role_portal_mapping = await this.roleUtils.create_role_portal_mapping(payload);

      return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));

    } catch (error) {

      console.log('45',"portal exist")

    }




  }



  /** Update existing record*/
  public update = async (req: any, res: Response) => {
    const input = req.body;
    const user_id = await this.utils.authToken(req.headers.authorization);
    input.updated_by = user_id;
    const portal_id = input.portal_id;

    const result = await this.roleUtils.update(input, req.params.id);
    input.portal_id = portal_id;

    const role_portal_mapping = await this.roleUtils.update_role_portal_mapping(input, req.params.id);
    // rabbit.publishToQueue(
    //   process.env.MS_QUEUE_NAME_ROLE_UPDATE,
    //   JSON.stringify({
    //     id: req.params.id,
    //     data: input,
    //   })
    // );

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
    }
  }

  /** Fetch single record*/
  public getOne = async (req: any, res: Response) => {
    const result = await this.roleUtils.getOne(req.params.id);
    // console.log(result);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Fetch multiple records*/
  public getAll = async (req: any, res: Response) => {
    const result = await this.roleUtils.getAll(req.body);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Single delete*/
  public delete = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.roleUtils.delete(req.params.id, user_id);
    var isDependent = req.t("DELETE_RECORD_SUCCESS");
    if (result) {
      if (req.body.isDependent) {
        isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
      }

      return res.status(Constants.OK).json(ResponseBuilder.successMessage(isDependent));
    } else {
      if (req.body.isDependent) {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
      } else {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
      }
    }
  }

  /** Multiple delete*/
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.roleUtils.deleteMany(req.body.ids, user_id);

    var isDependent = "";
    if (result) {
      if (req.body.isDependent) {
        isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
      }

      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent));
    } else {
      if (req.body.isDependent) {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
      } else {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
      }
    }
  }

  /** Toggle status from Active/Inactive*/
  public toggleStatus = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.roleUtils.toggleStatus(req.body.ids, req.body.status, user_id);

    var isDependent = "";
    if (result) {
      if (req.body.isDependent) {
        isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
      }

      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_STATUS_SUCCESS") + isDependent));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_STATUS_FAIL")));
    }
  }

}