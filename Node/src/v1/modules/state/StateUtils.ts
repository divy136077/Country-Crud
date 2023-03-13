import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class StateUtils {

    public async getAllState(id:number) {
        // query
    //    const id=req.params
        let query = `SELECT * from ${Tables.STATE} WHERE IsActive = 1 AND IsDeleted=0 AND CountryId=${id}`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}