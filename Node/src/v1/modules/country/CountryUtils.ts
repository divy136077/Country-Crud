import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class CountryUtils {

    public async getAllCountry() {
        // query
        let query = `SELECT * from ${Tables.COUNTRY} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}