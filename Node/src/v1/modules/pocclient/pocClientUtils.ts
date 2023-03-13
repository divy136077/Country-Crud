import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class PocClientUtils {

    poc = [];

    public async create(input) {
        console.log(input)
        const poc = await My.insert(Tables.POCCLIENT, input);
        const pocData = await this.getOne(poc.insertId);

        return pocData
    }

    public async update(input, id: number) {
        const rights = await My.updateFirst(Tables.POCCLIENT, input, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async getOne(id: number) {
        let query = `SELECT pt.Name,pt.Id,p.IsActive,pt.Id AS PocTypeId,p.ClientGroupId,p.Email,p.Designation, p.PhoneNo,p.PocName  from ${Tables.POCCLIENT} AS p Inner join ${Tables.POCTYPE} AS pt on pt.Id = p.POCTypeId  WHERE  p.Id=${id}`;
        const totalItems = await My.query(query);
        return totalItems;
    }

    public async getAll(id) {
        let response;
        let query = `SELECT pt.Name,p.IsActive,pt.Id AS PocTypeId,p.id,p.Email,p.Designation, p.PhoneNo,p.PocName  from ${Tables.POCCLIENT} AS p Inner join ${Tables.POCTYPE} AS pt on pt.Id = p.POCTypeId  INNER JOIN ${Tables.CLIENTGROUP} AS cg ON cg.Id = p.ClientGroupId WHERE cg.Id = ${id} AND p.IsDeleted=0`;

        const totalItems = await My.query(query);

        response = {
            "totalItems": totalItems.length,
            "items": totalItems
        }

        return response;
    }
    public async delete(id: number) {
        const rights = await My.updateFirst(Tables.POCCLIENT, { IsDeleted: 1 }, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } 
    public async deleteMany(ids: string) {
        console.log("ids", ids)
        const rights = await My.query(`UPDATE ${Tables.POCCLIENT} SET IsDeleted = 1 WHERE id in (${ids})`);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public async toggleStatus(ids: string, status) {
        const rights = await My.query(`UPDATE ${Tables.POCCLIENT} SET IsActive = ${status} WHERE id in (${ids})`);

        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

}