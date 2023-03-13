import * as Sql from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class SettingTypeUtils {

    /**
     * Create new record
     */
    public async create(input) {
        return await Sql.insert(Tables.SETTINGTYPE, input);
    }

    /**
     * Update existing record
     */
    public async update(input, id: number) {
        const settingType = await Sql.updateFirst(Tables.SETTINGTYPE, input, `id = ?`, [id]);
        if (settingType.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

     /**
     * Fetch single record with id
     */
    public async getOne(id: number) {
        return await Sql.first(Tables.SETTINGTYPE, ["*"], "id = ? AND status != 2", [id]);
    }

     /**
     * Fetch single record with slug
     */
    public async getSetting(slug: any) {
        return await Sql.query(`SELECT * FROM ${Tables.SETTINGTYPE} AS st LEFT JOIN ${Tables.SETTING} AS s ON st.id = s.setting_type_id WHERE st.slug = '${slug}' AND st.status != 2`);
    }
    
    /**
     * Fetch all records
     */
    public async getAll(req) {
        let response;

        //search
        let filters = '';
        if(req.filters){
            if (req.filters.hasOwnProperty('status')) {
                filters += ` status = ${req.filters.status}`;
              } else {
                filters += ` status != 2 `;
              }
            if (req.filters.search) {
                filters += ` AND name LIKE '%${req.filters.search}%'`;
            }
        }

        //pagination
        let offset;
        if (req.limit && req.page) {
          offset = (req.page - 1) * req.limit;
        }

        //sorting
        let orderBy = ` ORDER BY ${Tables.SETTINGTYPE}.id DESC`;
        if (req.sortDir && req.sortField) {
          orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        //query
        let query = `SELECT * from ${Tables.SETTINGTYPE} WHERE `;
        if (filters != '') {
            query += filters;
        }

        query += orderBy;

        let totalItems = await Sql.query(query);
        if (req.limit && req.page) {
            query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
            let result = await Sql.query(query);

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

    /**
     * Single delete
     */
    public async delete(id: number, user_id: number) {
        const settingType = await Sql.updateFirst(Tables.SETTINGTYPE, {status: 2, deleted_by: user_id}, `id = ?`, [id]);
        if (settingType.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    /**
     * Multile delete
     */
    public async deleteMany(ids: string, user_id: number) {
        const settingType = await Sql.query(`UPDATE ${Tables.SETTINGTYPE} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);

        if (settingType.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    /**
     * Toggle status from Active/Inactive
     */
    public async toggleStatus(ids: string, status, user_id: number) {
        const settingType = await Sql.query(`UPDATE ${Tables.SETTINGTYPE} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);

        if (settingType.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }


}