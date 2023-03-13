import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";
import { Utils } from "../../../helpers/utils";

export class ModuleUtils {
    /** Create new record */
    public async create(input) {
        return await My.insert(Tables.MODULES, input);        
    }
    
    /** Update existing record */
    public async update(input, id: number) {
        const module = await My.updateFirst(Tables.MODULES, input, `id = ?`, [id]);      
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }  
    }

    /** Get single record based on id*/
    public async getOne(id: number) {
        return await My.first(Tables.MODULES, ["*"], "id = ? AND status !=2", [id]);        
    }

    /** Get all records*/
    public async getAll(req) {  
        let response;

        //search
        let filters = '';
        if(req.filters){
            if (req.filters.search) {
                filters += ` AND (${Tables.MODULES}.name LIKE '%${req.filters.search}%' OR ${Tables.PORTAL}.name LIKE '%${req.filters.search}%')`;
            }
            if (req.filters.hasOwnProperty('status')) {
                filters += ` AND ${Tables.MODULES}.status = ${req.filters.status}`;
            }
        }

        //pagination
        let offset;
        if (req.limit && req.page) {
          offset = (req.page - 1) * req.limit;
        }

        //sorting
        let orderBy = ` ORDER BY ${Tables.MODULES}.id DESC`;
        if (req.sortDir && req.sortField) {
          orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        //query
        let query = `SELECT ${Tables.MODULES}.*,${Tables.PORTAL}.name as portal_name from ${Tables.MODULES} `+
        `LEFT JOIN ${Tables.PORTAL} ON ${Tables.MODULES}.portal_id = ${Tables.PORTAL}.id WHERE ${Tables.MODULES}.status != 2 `;

        if (filters != '') {
            query += filters;
        } 
        
        query += orderBy;

        let totalItems = await My.query(query);

        if (req.limit && req.page) {
            query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
            let result = await My.query(query);

            response = {
              "totalItems": totalItems.length,
              "items": result
            }
        } else {
            response = {
              "totalItems": totalItems.length,
              "items": totalItems
            }
        }

        return response;            
    }

    /**Single delete */
    public async delete(id: number, user_id: number) {
        const module = await My.updateFirst(Tables.MODULES, {status: 2, deleted_by: user_id}, `id = ?`, [id]);      
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }  
    }

    /** Multiple delete*/
    public async deleteMany(ids: string, user_id: number) {
        const module = await My.query(`UPDATE ${Tables.MODULES} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);  
      
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }  
    }

    /** Toggle status from Active/Inactive*/
    public async toggleStatus(ids: string, status, user_id: number) {
        const module = await My.query(`UPDATE ${Tables.MODULES} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);  
      
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }  
    }

    /**Trucate table */
    public async truncateACL() {
        return await My.query(`SET FOREIGN_KEY_CHECKS=0;TRUNCATE TABLE  ${Tables.ROLES};TRUNCATE TABLE  ${Tables.RIGHTS};TRUNCATE TABLE  ${Tables.MODULES};SET FOREIGN_KEY_CHECKS=1;`);
    }   
    /** Fetch single record*/
    public async getmodule(id: number) {
        let query = `SELECT * from ${Tables.MODULES} where deleted = 0 AND status = 1 AND portal_id = ${id}`
        let totalItems = await My.query(query);

        return totalItems;
    }

}