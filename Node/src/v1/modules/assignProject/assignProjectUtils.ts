import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";


export class AssignProjectUtils {
  public async create(input) {
    return await My.insert(Tables.ASSIGN, input);
  }

  /** To fetch single record */
  public async getOne(id: number) {
    return await My.first(Tables.GETCOUNTRY, ["*"], [id]);
  }
}