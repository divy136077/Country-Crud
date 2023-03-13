import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class LanguageUtils {

    public async create(input) {
        return await My.insert(Tables.LANGUAGE, input);
    }

    public async update(input, id: number) {
        const rights = await My.updateFirst(Tables.LANGUAGE, input, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    public async getOne(id: number) {
        return await My.first(Tables.LANGUAGE, ["*"], "id = ? AND status!=2", [id]);
    }

    public async getAll(req) {
        let response;

        // search
        let filters = '';
        if(req.filters){
            if (req.filters.search) {
                filters += ` AND (title LIKE '%${req.filters.search}%')`;
            }
            if (req.filters.status) {
                filters += ` AND status = ${req.filters.status}`;
            }
        }


        // pagination
        let offset;
        if (req.limit && req.page) {
          offset = (req.page - 1) * req.limit;
        }

        // sorting
        let orderBy = ` ORDER BY ${Tables.LANGUAGE}.id DESC`;
        if (req.sortDir && req.sortField) {
          orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        // query
        let query = `SELECT * from ${Tables.LANGUAGE} WHERE status = 1 `;
        if (filters !== '') {
            query += filters;
        }

        query += orderBy;

        const totalItems = await My.query(query);

        if (req.limit && req.page) {
            query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
            const result = await My.query(query);

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

    public async delete(id: number) {
        const rights = await My.updateFirst(Tables.LANGUAGE, {status: 2}, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    public async deleteMany(ids: string) {
        const rights = await My.query(`UPDATE ${Tables.LANGUAGE} SET status = 2 WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

    public async toggleStatus(ids: string, status) {
        const rights = await My.query(`UPDATE ${Tables.LANGUAGE} SET status = ${status} WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
           return true;
        } else{
            return false;
        }
    }

}