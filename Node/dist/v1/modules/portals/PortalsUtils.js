"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalsUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../../config/tables");
class PortalsUtils {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.PORTAL, input);
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.updateFirst(tables_1.Tables.PORTAL, input, `id = ?`, [id]);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.PORTAL, ["*"], "id = ?", [id]);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('----------------------------');
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
                console.log('111', req);
                let response;
                let filters = '';
                if (req.filters) {
                    console.log('12', req.filters.search);
                    if (req.filters.search) {
                        filters += ` AND ${tables_1.Tables.PORTAL}.name LIKE '%${req.filters.search}%' or ${tables_1.Tables.PORTAL}.url LIKE '%${req.filters.search}%' or ${tables_1.Tables.USERS}.owner  LIKE '%${req.filters.search}%'`;
                        console.log('13', filters);
                    }
                    if (req.filters.hasOwnProperty('status')) {
                        filters += ` AND ${tables_1.Tables.PORTAL}.status = ${req.filters.status} `;
                        console.log('14', filters);
                    }
                    // if (ID) {
                    //     console.log('23', ID)
                    //     filters += ` AND FIND_IN_SET(${ID},${Tables.PORTAL}.owner) `;
                    //     console.log('15', filters)
                    // }
                }
                const selectQuery = My.initQuery();
                selectQuery.select(`${tables_1.Tables.PORTAL}.*`, `GROUP_CONCAT(CONCAT (${tables_1.Tables.USERS}.first_name, ' ', ${tables_1.Tables.USERS}.last_name)) AS ownername`);
                //pagination
                let offset;
                if (req.limit && req.page) {
                    offset = (req.page - 1) * req.limit;
                }
                //sorting
                let orderBy = ` ORDER BY ${tables_1.Tables.PORTAL}.id DESC`;
                if (req.sortDir && req.sortField) {
                    orderBy = ` ORDER BY ${tables_1.Tables.PORTAL}.${req.sortField} ${req.sortDir}`;
                }
                //query
                let query = `SELECT ${tables_1.Tables.PORTAL}.*, GROUP_CONCAT(CONCAT (${tables_1.Tables.USERS}.first_name, ' ', ${tables_1.Tables.USERS}.last_name)) AS ownername from ${tables_1.Tables.PORTAL}  LEFT JOIN ${tables_1.Tables.USERS}  ON FIND_IN_SET(${tables_1.Tables.USERS}.id, ${tables_1.Tables.PORTAL}.owner) > 0  WHERE ${tables_1.Tables.PORTAL}.is_deleted = 0 `;
                if (filters != '') {
                    query += filters;
                }
                query += ` GROUP BY ${tables_1.Tables.PORTAL}.id `;
                query += orderBy;
                let totalItems = yield My.query(query);
                if (req.limit && req.page) {
                    query += ` LIMIT ` + req.limit + ` OFFSET ` + offset;
                    let result = yield My.query(query);
                    response = {
                        "totalItems": totalItems.length,
                        "items": result
                    };
                }
                else {
                    response = {
                        "totalItems": totalItems.length,
                        "items": totalItems
                    };
                }
                return response;
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //  const portal = await My.updateFirst(Tables.PORTAL, { is_deleted: 1, deleted_on : currentTimestamp }, `id = ?`, [id]);
            const portal = yield My.query(`UPDATE ${tables_1.Tables.PORTAL} SET is_deleted = 1, deleted_on = CURRENT_TIMESTAMP  WHERE id =  ${id}`);
            if (portal.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.query(`UPDATE ${tables_1.Tables.PORTAL} SET is_deleted = 1,deleted_on = CURRENT_TIMESTAMP WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    toggleStatus(ids, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield My.query(`UPDATE ${tables_1.Tables.PORTAL} SET status = ${status} WHERE id in (${ids})`);
            if (module.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    dataForMail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.query("SELECT u.*, AES_DECRYPT(u.email, '" + process.env.SECRET_KEY + "') as email_new, AES_DECRYPT(u.phone, '" + process.env.SECRET_KEY + "') as phone_new, CONCAT('[{', GROUP_CONCAT(DISTINCT REPLACE(REPLACE(roles.rights, '[{', ''), '}]', '')), '}]') AS user_permissions, AES_DECRYPT(u.otp, '" + process.env.SECRET_KEY + "') as otp_new FROM " + tables_1.Tables.USERS + " as u LEFT JOIN roles ON FIND_IN_SET(roles.id, u.role_id) WHERE  u.id IN (" + id + ") AND u.status != 2   GROUP BY u.id");
        });
    }
}
exports.PortalsUtils = PortalsUtils;
//# sourceMappingURL=PortalsUtils.js.map