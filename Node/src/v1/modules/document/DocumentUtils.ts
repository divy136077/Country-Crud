import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class DocumentUtils {

    public async create(input) {
        console.log(input);
        return await My.insert(Tables.DOCUMENT, input);
    }

    public async getOne(id: number) {
        // return await My.first(Tables.DOCUMENT, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
        let query = `SELECT dt.Name, d.IsActive, dt.Id AS DocumentTypeId, d.PeriodFrom, d.PeriodTo, d.DocumentName, d.DocumentPath  from ${Tables.DOCUMENT} AS d Inner join ${Tables.DOCUMENTTYPE} AS dt on dt.Id = d.DocumentTypeId  WHERE  d.Id=${id}`;
        const totalItems = await My.query(query);
        return totalItems;
    }

    public async getAll(req) {
        let response;
        // query
        let query = `SELECT dt.Name, d.IsActive, dt.Id AS DocumentTypeId, d.PeriodFrom, d.PeriodTo, d.DocumentName, d.DocumentPath  from ${Tables.DOCUMENT} AS d Inner join ${Tables.DOCUMENTTYPE} AS dt WHERE dt.Id = d.DocumentTypeId AND  d.isDeleted = 0`;;
        
        const totalItems = await My.query(query);

        response = {
            "totalItems": totalItems.length,
            "items": totalItems
        }

        return response;
    }
    public async delete(id: number) {
        const rights = await My.updateFirst(Tables.DOCUMENT, { isDeleted: 1 }, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}