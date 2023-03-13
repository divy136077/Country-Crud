import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class GovernanceManagementUtils {

    public async getAllGovernanceManagement() {
        //query

        let query = `SELECT * from ${Tables.GOVERNANCEMANAGEMENT} WHERE IsActive = 1 AND IsDeleted = 0` ;
        
        const totalItems = await My.query(query);
        
        if(totalItems.length > 0){
            return totalItems ;
        }
        else{
            return null ;
        }
    }

}