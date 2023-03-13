import * as My from "jm-ez-mysql";
import * as Sql from "jm-ez-mysql";
import * as _ from "lodash";
import { filter } from "lodash";
import { Tables } from "../../../config/tables";
import { Utils } from "../../../helpers/utils";
import { Failure } from '../../../helpers/error';

export class PortalsUtils {

    public async create(input) {
        return await My.insert(Tables.PORTAL, input);
    }

    public async update(input, id: number) {
        const module = await My.updateFirst(Tables.PORTAL, input, `id = ?`, [id]);
        if (module.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async getOne(id: number) {
        return await My.first(Tables.PORTAL, ["*"], "id = ?", [id]);
    }

    public async getAll(req, res) {
        try {
            console.log('----------------------------')
            // console.log('11', req)
            // // console.log('16',req.filters.ownerId)
            // console.log('17', req.filters.search)
            // const data = req.filters.search.split(' ')
            // console.log('20', data)
            // const fName = data[0]
            // console.log('19', fName)
            // let lName = data[1]
           
            // console.log('18', lName)

            // const ownerId = await Sql.query("SELECT id FROM " + Tables.USERS + " WHERE first_name LIKE ? AND last_name LIKE ?", [fName, lName]);
            // const ID = ownerId[0].id
            // console.log('21', ownerId);
            // console.log('22', ID)

            console.log('111',req)

            let response;

            let filters = '';

            if (req.filters) {
                console.log('12', req.filters.search)

                if (req.filters.search) {
                    filters += ` AND ${Tables.PORTAL}.name LIKE '%${req.filters.search}%' or ${Tables.PORTAL}.url LIKE '%${req.filters.search}%' or ${Tables.USERS}.owner  LIKE '%${req.filters.search}%'`;
                    console.log('13', filters)
                }
                if (req.filters.hasOwnProperty('status')) {
                    filters += ` AND ${Tables.PORTAL}.status = ${req.filters.status} `;
                    console.log('14', filters)

                }
                // if (ID) {
                //     console.log('23', ID)

                //     filters += ` AND FIND_IN_SET(${ID},${Tables.PORTAL}.owner) `;
                //     console.log('15', filters)

                // }
            }

            const selectQuery = My.initQuery();
            selectQuery.select(`${Tables.PORTAL}.*`, `GROUP_CONCAT(CONCAT (${Tables.USERS}.first_name, ' ', ${Tables.USERS}.last_name)) AS ownername`);

            //pagination
            let offset;
            if (req.limit && req.page) {
                offset = (req.page - 1) * req.limit;
            }

            //sorting
            let orderBy = ` ORDER BY ${Tables.PORTAL}.id DESC`;
            if (req.sortDir && req.sortField) {
                orderBy = ` ORDER BY ${Tables.PORTAL}.${req.sortField} ${req.sortDir}`
            }

            //query
            let query = `SELECT ${Tables.PORTAL}.*, GROUP_CONCAT(CONCAT (${Tables.USERS}.first_name, ' ', ${Tables.USERS}.last_name)) AS ownername from ${Tables.PORTAL}  LEFT JOIN ${Tables.USERS}  ON FIND_IN_SET(${Tables.USERS}.id, ${Tables.PORTAL}.owner) > 0  WHERE ${Tables.PORTAL}.is_deleted = 0 `;
            if (filters != '') {
                query += filters;
            }

            query += ` GROUP BY ${Tables.PORTAL}.id `;
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
        } catch (error) {
            res.json(error);

        }


    }

    public async delete(id: number) {
        //  const portal = await My.updateFirst(Tables.PORTAL, { is_deleted: 1, deleted_on : currentTimestamp }, `id = ?`, [id]);
        const portal = await My.query(`UPDATE ${Tables.PORTAL} SET is_deleted = 1, deleted_on = CURRENT_TIMESTAMP  WHERE id =  ${id}`);
        if (portal.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async deleteMany(ids: string) {
        const module = await My.query(`UPDATE ${Tables.PORTAL} SET is_deleted = 1,deleted_on = CURRENT_TIMESTAMP WHERE id in (${ids})`);

        if (module.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async toggleStatus(ids: string, status) {
        const module = await My.query(`UPDATE ${Tables.PORTAL} SET status = ${status} WHERE id in (${ids})`);

        if (module.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public async dataForMail(id) {

        return await My.query("SELECT u.*, AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') as email_new, AES_DECRYPT(u.phone, '" + process.env.SECRET_KEY + "') as phone_new, CONCAT('[{', GROUP_CONCAT(DISTINCT REPLACE(REPLACE(roles.rights, '[{', ''), '}]', '')), '}]') AS user_permissions, AES_DECRYPT(u.otp, '" + process.env.SECRET_KEY + "') as otp_new FROM " + Tables.USERS + " as u LEFT JOIN roles ON FIND_IN_SET(roles.id, u.role_id) WHERE  u.id IN (" + id + ") AND u.status != 2   GROUP BY u.id");


    }
    // public async truncateACL() {
    //     return await My.query(`SET FOREIGN_KEY_CHECKS=0;TRUNCATE TABLE  ${Tables.ROLES};TRUNCATE TABLE  ${Tables.RIGHTS};TRUNCATE TABLE  ${Tables.MODULES};SET FOREIGN_KEY_CHECKS=1;`);
    // }

}