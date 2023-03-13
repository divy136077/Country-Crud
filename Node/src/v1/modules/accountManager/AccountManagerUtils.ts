import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class AccountManagerUtils {

    public async getAllAccountManager() {
        //query

        let query = `SELECT * from ${Tables.ACCOUNTMANAGER} WHERE IsActive = 1 AND IsDeleted = 0` ;
        
        const totalItems = await My.query(query);
        
        if(totalItems.length > 0){
            return totalItems ;
        }
        else{
            return null ;
        }
    }

}