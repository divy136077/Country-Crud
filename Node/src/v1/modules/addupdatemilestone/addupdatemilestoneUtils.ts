import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class AddUpadateMilestoneUtils {
    /**get all Milestone */
    public async getAllMilestone() {
        // let query = `SELECT * from ${Tables.MILESTONE} WHERE IsActive = 1 AND IsDeleted=0`;
        let query = `SELECT mi.Percentage,w.IsActive,mi.Id AS TypeId,w.Id,w.MileStoneName,w.DueDate from ${Tables.MILESTONE} AS w Inner join ${Tables.PERCENTAGE} AS mi ON mi.Id = w.MileStonePercentageId WHERE w.IsActive=1 AND w.IsDeleted=0`;
        const totalItems = await My.query(query);
        console.log(totalItems);
        return totalItems;
    }

    /**post api milestone add update part */
    public async create(input) {
        return await My.insert(Tables.MILESTONE, input);
    }

    /**edit(update) api milestone add update part */
    public async update(input, id: number) {
        const rights = await My.updateFirst(Tables.MILESTONE, input, `id = ?`, [id]);
        // return await My.updateFirst(Tables.MILESTONE, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**delete one data api milestone add update */
    public async delete(id: number) {
        const rights = await My.updateFirst(Tables.MILESTONE, { IsDeleted: 1 }, `id = ?`, [id]);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** To fetch single record */
    public async getOne(id: number) {
        let query = `SELECT mi.Percentage,w.IsActive,mi.Id AS TypeId,w.Id,w.MileStoneName,w.DueDate from ${Tables.MILESTONE} AS w Inner join ${Tables.PERCENTAGE} AS mi ON mi.Id = w.MileStonePercentageId WHERE w.Id=${id}`;
        const totalItems = await My.query(query);
        console.log(totalItems);
        return totalItems;

        // return await My.first(Tables.MILESTONE, ["*"], "id = ? AND isActive = 1 AND isDeleted = 0", [id]);
    }

    /**to status change */
    public async toggleStatus(ids: string, status) {
        const rights = await My.query(`UPDATE ${Tables.MILESTONE} SET IsActive = ${status} WHERE id in (${ids})`);
        if (rights.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

