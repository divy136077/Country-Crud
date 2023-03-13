import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class RoleUtils {

    /** Create new role*/
    public async create(input) {
        delete input.portal_id;
        return await My.insert(Tables.ROLES, input);
    }

    /** Create new create role_portal_mapping */
    public async create_role_portal_mapping(input) {
        delete input.name;
        delete input.created_by;
        delete input.status;

        return await My.insert(Tables.ROLE_PORTAL_MAPPING, input);
    }

    /** Update existing role*/
    public async update(input, id: number) {
        delete input.portal_id;
        const role = await My.updateFirst(Tables.ROLES, input, `id = ?`, [id]);
        if (role.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Update existing role*/
    public async update_role_portal_mapping(input, id: number) {
        delete input.name;
        delete input.updated_by;
        delete input.status;

        const role = await My.updateFirst(Tables.ROLE_PORTAL_MAPPING, input, `role_id = ?`, [id]);
        if (role.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
    /** Fetch single record*/
    public async getOne(id: any) {

        let query = `SELECT mapping.portal_id, role.* from ${Tables.ROLES} as role 
            LEFT JOIN  ${Tables.ROLE_PORTAL_MAPPING} as mapping ON 
            mapping.role_id = role.id
            WHERE role.id = ${id}`;

        let data = await My.query(query);

        data = (data) ? data[0] : '';
        return data;
    }

    /** Fetch multiple records*/
    public async getAll(req) {
        let response;

        //search
        let filters = '';
        if (req.filters) {
            if (req.filters.search) {
                filters += ` AND name LIKE '%${req.filters.search}%'`;
            }
            if (req.filters.hasOwnProperty('status')) {
                filters += ` AND status = ${req.filters.status}`;
            }
            if (req.filters.ids) {
                filters += ` AND id IN (${req.filters.ids})`;
            }
        }

        //pagination
        let offset;
        if (req.limit && req.page) {
            offset = (req.page - 1) * req.limit;
        }

        //sorting
        let orderBy = ` ORDER BY ${Tables.ROLES}.id DESC`;
        if (req.sortDir && req.sortField) {
            orderBy = ` ORDER BY ${req.sortField} ${req.sortDir}`
        }

        //query
        let query = `SELECT * from ${Tables.ROLES} WHERE status != 2 `;
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

    /** Single delete*/
    public async delete(id: number, user_id: number) {
        const role = await My.updateFirst(Tables.ROLES, { status: 2, deleted_by: user_id }, `id = ?`, [id]);
        if (role.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Multiple delete*/
    public async deleteMany(ids: string, user_id: number) {
        const role = await My.query(`UPDATE ${Tables.ROLES} SET status = 2, deleted_by = ${user_id} WHERE id in (${ids})`);

        if (role.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** Toggle status from Active/Inactive*/
    public async toggleStatus(ids: string, status, user_id: number) {
        const role = await My.query(`UPDATE ${Tables.ROLES} SET status = ${status}, updated_by = ${user_id} WHERE id in (${ids})`);

        if (role.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

}