import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class ProjectManagerUtils {

    public async getAllManager() {
        // query
        let query = `SELECT * from ${Tables.MANAGER} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}
