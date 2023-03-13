import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class CurrencyUtils {

    public async getAllCurrency() {
        // query
        let query = `SELECT * from ${Tables.CURRENCY} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}