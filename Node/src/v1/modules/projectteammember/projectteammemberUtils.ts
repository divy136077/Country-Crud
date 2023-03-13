import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class ProjectTeamMemberUtils {

    public async getAllTeamMember() {
        // query
        let query = `SELECT * from ${Tables.TEAM} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}
