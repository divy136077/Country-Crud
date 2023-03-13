import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class PocProjectUtils {

    public async create(input) {
        const data = input.PocProject

        console.log('data= ', data)

        return await My.insert(Tables.POCPROJECT, data);
    }

    public async update(input, id: number) {
        const data = input.PocProject

        const rights = await My.updateFirst(Tables.POCPROJECT, data, `id = ?`, [id]);

        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async getOne(id: number) {
        return await My.first(Tables.POCPROJECT, ["*"], "id = ? ", [id]);
    }

    public async getAll() {
        // query
        let query = `SELECT * from ${Tables.POCPROJECT} WHERE IsActive = 1 AND IsDeleted=0`;

        const totalItems = await My.query(query);

        return totalItems;
    }


    public async delete(id: number) {
        const rights = await My.updateFirst(Tables.POCPROJECT, { IsDeleted: 1 }, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async deleteMany(ids: string) {
        console.log("ids", ids)
        const rights = await My.query(`UPDATE ${Tables.POCPROJECT} SET IsDeleted = 1 WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async toggleStatus(ids: string, status) {

        const rights = await My.query(`UPDATE ${Tables.POCPROJECT} SET IsActive = ${status} WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }


    public async getPOCName() {
        const rights = `SELECT POCc.Id,POCc.POCName FROM ${Tables.POCCLIENT} as POCc INNER JOIN ${Tables.POCTYPE} as POCt ON POCt.Id = POCc.POCTypeId WHERE POCt.Name = "Project" AND POCc.IsActive = 1`

        const totalItems = await My.query(rights);
        // console.log(totalItems)

        return totalItems;
    }


}