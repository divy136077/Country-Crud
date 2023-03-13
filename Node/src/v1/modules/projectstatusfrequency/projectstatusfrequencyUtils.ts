import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class ProjectStatusFrequencyUtils {

    public async getAllProjectStatusFrequency() {
        // query
        let query = `SELECT * from ${Tables.FREQUENCY} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}
