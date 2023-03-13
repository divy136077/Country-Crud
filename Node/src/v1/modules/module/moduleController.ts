import { Response } from "express" ;
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { ModuleUtils } from "./moduleUtils";
import { Constants } from '../../../config/constants';
import { Utils } from "../../../helpers/utils";
import { Tables } from "../../../config/tables";

export class ModuleController {
  private moduleUtils: ModuleUtils = new ModuleUtils();
  private utils: Utils = new Utils();
  dependacyResponse

  /**Create new record */
  public create = async (req: any, res: Response) => {
    let payload = req.body;
    const slug = await this.utils.slug(payload.name, 'slug', null, Tables.MODULES);
    payload.slug = slug;
    const user_id = await this.utils.authToken(req.headers.authorization);
    payload.created_by = user_id;
    const result = await this.moduleUtils.create(payload);
    payload.id = result.insertId;

    return res.status(Constants.CREATED).json(ResponseBuilder.data(payload));
  }

  /** Update existing record */
  public update = async (req: any, res: Response) => {
    const payload = req.body;
    const user_id = await this.utils.authToken(req.headers.authorization);
    payload.updated_by = user_id;
    const result = await this.moduleUtils.update(payload, req.params.id);

    if (result) {
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("UPDATE_RECORD_SUCCESS")));
    } else {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("UPDATE_RECORD_FAIL")));
    }
  }

  /** Get single record based on id */
  public getOne = async (req: any, res: Response) => {
    const result = await this.moduleUtils.getOne(req.params.id);

    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Get multiple records*/
  public getAll = async (req: any, res: Response) => {
    const result = await this.moduleUtils.getAll(req.body);

    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

  /** Single delete */
  public delete = async (req: any, res: Response) => {


    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.moduleUtils.delete(req.params.id, user_id);


    console.log('111', user_id, result)


    var isDependent = req.t("DELETE_RECORD_SUCCESS");


    if (result) {

      console.log('112', req.body.isDependent)

      if (req.body.isDependent) {
        isDependent = req.t("RECORD_EXISTS") + req.body.isDependent;
      }
      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS")));

      // return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent));
    } else {
      if (req.body.isDependent) {

        console.log('113', req.body.isDependent)

        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
      } else {
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
      }
    }
  }

  /** Multiple delete */
  public deleteMany = async (req: any, res: Response) => {
    const user_id = await this.utils.authToken(req.headers.authorization);
    const result = await this.moduleUtils.deleteMany(req.body.ids, user_id);
    console.log('115', result)
    var isDependent = "";


    // if (result) {
    //   console.log('118', req.body)
    //   if (req.body.isDependent) {
    //     console.log('117', req.body.isDependent)
    //     // isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;
    //     return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
    //   }
    //   // return res.json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + isDependent))

    //   return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent));

    // } else {
    //   console.log('119', !req.body.isDependent)

    //   if (!req.body.isDependent) {
    //     console.log('120', !req.body.isDependent)

    //     return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent))
    //     // return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));
    //   } else {
    //     return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("DELETE_RECORD_FAIL")));
    //   }
    // }


    if (result) {
      console.log('118', req.body)

      if (req.body.isDependent) {
        console.log('117', req.body.isDependent)
        // isDependent = " But " + req.t("RECORD_EXISTS") + req.body.isDependent;

        // return res.json({dependacyResponse: true})
       
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + req.body.isDependent));

      }


      return res.status(Constants.OK).json(ResponseBuilder.successMessage(req.t("DELETE_RECORD_SUCCESS") + req.body.isDependent));
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
    const result = await this.moduleUtils.toggleStatus(req.body.ids, req.body.status, user_id);
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

  /** Trucate table */
  public truncateACL = async (req: any, res: Response) => {
    const result = await this.moduleUtils.truncateACL();

    if (result) {
      return res.status(Constants.OK).json({});
    } else {
      return res.status(Constants.BAD_REQ).json({});
    }
  }
  /** Fetch single record */
  public getmodule = async (req: any, res: Response) => {
    const result = await this.moduleUtils.getmodule(req.params.id);
    return res.status(Constants.OK).json(ResponseBuilder.data(result));
  }

}