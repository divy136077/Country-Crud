import * as Sql from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class SettingUtils {

    /**
     * Create new record with encryption
     */
    public async create(input) {
        const newUser =  await Sql.insert(Tables.SETTING, input);
        const User = await Sql.query("UPDATE "+Tables.SETTING+" SET value = AES_ENCRYPT('"+input.value+"', '"+process.env.SECRET_KEY+"') WHERE id = ?", [newUser.insertId]);
        // Here update query because we don't know how many fields would come in input from user

        return newUser;
    }

    /**
     * Update existing record with encryption
     */
    public async update(input, id: number) {
        const module = await Sql.updateFirst(Tables.SETTING, input, `id = ?`, [id]);
        const User = await Sql.query("UPDATE "+Tables.SETTING+" SET value = AES_ENCRYPT('"+input.value+"', '"+process.env.SECRET_KEY+"') WHERE id = ?", [id]);
        // Here update query because we don't know how many fields would come in input from user
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    /**
     * Fetch single record with encryption
     */
    public async getOne(id: number) {
        return await Sql.query("SELECT *, AES_DECRYPT(value, '"+process.env.SECRET_KEY+"') as value FROM "+Tables.SETTING+" WHERE status != 2 AND id = ? ", [Number(id)]);
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
        let orderBy = ` ORDER BY ${Tables.SETTING}.id DESC`;
        if (req.sortDir && req.sortField) {
          orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        //query
        let query = `SELECT * from ${Tables.SETTING} WHERE `;
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
        const module = await Sql.updateFirst(Tables.SETTING, {status: 2, deleted_by: user_id}, `id = ?`, [id]);
        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    /**
     * Multiple delete
     */
    public async deleteMany(ids: string, user_id: number) {
        const module = await Sql.query(`UPDATE ${Tables.SETTING} SET status = 2, deleted_by = ${user_id}WHERE id in (${ids})`);

        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    /**
     * Toggle status from Active/Inactive
     */
    public async toggleStatus(ids: string, status, user_id: number) {
        const module = await Sql.query(`UPDATE ${Tables.SETTING} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);

        if (module.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }
    
    /**
     * Update existing record with encryption
     * @returns true
     */
    public async updateExistingData() {
        const result = await Sql.query("SELECT id, value FROM "+Tables.SETTING);
        var updatedResult;
        if(result){
            result.forEach((item) => {
                updatedResult =  Sql.query("UPDATE "+Tables.SETTING+" SET value = AES_ENCRYPT('"+item.value.toString()+"', '"+process.env.SECRET_KEY+"') WHERE id = ?", [item.id]);
            });
        }

        return true;
    }

}