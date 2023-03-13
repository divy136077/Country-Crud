import { Response } from 'express';
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { MenusUtils } from "./menusUtils";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";

export class MenusController {
  private menusUtils: MenusUtils = new MenusUtils();
  private utils: Utils = new Utils();

  /* To create new menu */
  public create = async (req: any, res: Response) => {
    let payload = req.body;
    if (payload.module_id == "" || !payload.module_id || payload.module_id == undefined) {
      const slug = await this.menusUtils.slug(payload.name, 'slug', null, null);
      payload.slug = slug;
    }
    const user_id = await this.utils.authToken(req.headers.authorization);
    payload.created_by = user_id;
    const result = await this.menusUtils.create(payload);
    payload.id = result.insertId;

    return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
  }

  /* To update new menu */
  public update = async (req: any, res: Response) => {
    const payload = req.body;
    const user_id = await this.utils.authToken(req.headers.authorization);
    payload.updated_by = user_id;
    const result = await this.menusUtils.update(payload, req.params.id);
    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
    }
  }

  /* To get single record */
  public getOne = async (req: any, res: Response) => {
    const result = await this.menusUtils.getOne(req.params.id);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Get all the multiple records */
  public getAll = async (req: any, res: Response) => {
    const result = await this.menusUtils.getAll(req.body);

    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /* Single delete */
  public delete = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);

    const result = await this.menusUtils.delete(req.params.id, user_id);

    console.log('222', user_id, result)

    var isDependent = req.t("DELETE_RECORD_SUCCESS");

    console.log('223', isDependent)

    if (result) {
      if (req.body.isDependent) {
        isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
      }
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));

      // return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")+isDependent));
    } else {
      if (req.body.isDependent) {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
      } else {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
      }
    }
  }

  /* Multiple delete */
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.menusUtils.deleteMany(req.body.ids, user_id);
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

  /* Toggle status from Active/Inactive */
  public toggleStatus = async (req: any, res: Response) => {

    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.menusUtils.toggleStatus(req.body.ids, req.body.status, user_id);
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

  /** To get sidebar menu */
  public getBackendMenu = async (req: any, res: Response) => {
    const result: any = await this.menusUtils.getBackendMenu(req);

    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }
}