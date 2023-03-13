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
exports.Utils = void 0;
const constants_1 = require("../config/constants");
const moment = require("moment");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const Sql = require("jm-ez-mysql");
const mv = require("mv");
const jwt = require("jsonwebtoken");
const responseBuilder_1 = require("./responseBuilder");
const My = require("jm-ez-mysql");
const headers = {
    name: '',
    mobile: 1,
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    _country: '',
    type: '',
    date: '',
};
dotenv.config();
const saltRounds = 10;
class Utils {
    constructor() {
        /** Create slug */
        this.slug = (title, fieldName, id = null, tableName) => __awaiter(this, void 0, void 0, function* () {
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const query = { status: 1 };
            let where = '';
            if (slug) {
                const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
                where += ` slug ${likePatten} AND status != 2 `;
            }
            const obj = { where: query };
            const templateData = yield Sql.query(`SELECT slug FROM ${tableName} WHERE  slug LIKE '%${slug}%' AND status != 2`);
            const originalSlug = slug;
            const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);
            return latestSlug;
        });
        /** Recursive the string from slug */
        this.recursiveSlug = (data, originalSlug, slug, number, id) => {
            if (id == null) {
                let flag = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].slug === slug || data[i].Slug === slug) {
                        flag = true;
                    }
                    if (flag && (i == (data.length - 1))) {
                        number++;
                        slug = originalSlug + '-' + number;
                        return this.recursiveSlug(data, originalSlug, slug, number);
                    }
                }
                return slug;
            }
            else {
                let flag = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].slug == slug && (data[i].id != id || data[i].ID != id) || data[i].Slug == slug && (data[i].id != id || data[i].ID != id)) {
                        flag = true;
                    }
                    if (flag && (i == (data.length - 1))) {
                        number++;
                        slug = originalSlug + '-' + number;
                        return this.recursiveSlug(data, originalSlug, slug, number);
                    }
                }
                return slug;
            }
        };
        /** Upload profile picture */
        this.uploadProfile = (files) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var imgArr;
                const timeStampInMs = new Date().getTime();
                const oldpath = files.path;
                const filename = timeStampInMs + '_' + files.originalname;
                const newpath = 'public/profile_images/' + timeStampInMs + '_' + files.originalname;
                mv(oldpath, newpath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    const obj = {
                        'filename': filename,
                        'originalname': files.originalname,
                        'path': newpath,
                    };
                    imgArr = filename;
                    resolve(imgArr);
                });
            }));
        };
        /**
         * Authorise token from headers and return user id
         */
        this.authToken = (authorization) => __awaiter(this, void 0, void 0, function* () {
            let userId;
            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET, (err, token) => {
                    if (err) {
                    }
                    else {
                        userId = token.device_token.id;
                    }
                });
            }
            if (userId == undefined) {
                userId = 0;
            }
            return userId;
        });
        /**
         * To check the dependency of table1 with table2 and return dependent values
         */
        this.checkDbDependency = (req, res, table1, table2, tbl1field, tbl2field, pkId) => __awaiter(this, void 0, void 0, function* () {
            let idWhere = `1=1 `;
            if (req.params.id) { // for single delete
                if (pkId == 'rold_id') {
                    idWhere = `FIND_IN_SET(${req.params.id}, ${pkId})`;
                }
                else {
                    idWhere = ` ${pkId} = ${req.params.id}`;
                }
                var dependencyArr = new Array();
                if (table1) {
                    const tbl1 = yield My.first(table1, [tbl1field], `${idWhere} AND status=1`);
                    if (tbl1) {
                        dependencyArr.push(`${table1}:- ` + tbl1[tbl1field]);
                    }
                }
                if (table2) {
                    const tbl2 = yield My.first(table2, [tbl2field], `${idWhere} AND status=1`);
                    if (tbl2) {
                        dependencyArr.push(`${table2}:- ` + tbl2[tbl2field]);
                    }
                }
                if (dependencyArr.length > 0) {
                    req.params.id = null;
                    const dependencyStr = dependencyArr.join(", ");
                    req.body.isDependent = dependencyStr;
                    return true;
                }
                else {
                    return true;
                }
            }
            if (req.body.ids) { // for multiple delete/toggle
                var dependencyArr = new Array();
                var usedArr = new Array();
                var unUsedArr = new Array();
                if (pkId == 'rold_id') {
                    idWhere = `FIND_IN_SET(${req.params.id}, ${pkId})`;
                }
                else {
                    idWhere = ` ${pkId} IN (${req.body.ids})`;
                }
                var ids = req.body.ids.split(",");
                ids.forEach(idVal => {
                    unUsedArr.push(Number(idVal));
                });
                if (table1) {
                    const tbl1 = yield My.query(`SELECT ${pkId}, ${tbl1field} from ${table1} WHERE status != 2 AND ${idWhere}`);
                    if (tbl1) {
                        var table1Arr = new Array();
                        tbl1.forEach(tbl1Val => {
                            Object.entries(tbl1Val).forEach(([key, value]) => {
                                if (typeof value === 'number') {
                                    usedArr.push(value);
                                }
                                else if (key == 'role_id' && typeof value === 'string') {
                                    value = value.split(",")[0];
                                    usedArr.push((Number(value)));
                                }
                                else {
                                    table1Arr.push(value);
                                }
                            });
                        });
                        if (table1Arr.length > 0) {
                            var filteredtable1Arr = table1Arr.filter(function (item, pos) {
                                return table1Arr.indexOf(item) == pos;
                            });
                            dependencyArr.push(`${table1}:- ` + filteredtable1Arr.join(', '));
                        }
                    }
                }
                if (table2) {
                    const tbl2 = yield My.query(`SELECT ${pkId}, ${tbl2field} from ${table2} WHERE status != 2 AND ${idWhere}`);
                    if (tbl2) {
                        var table2Arr = new Array();
                        tbl2.forEach(tbl2Val => {
                            Object.entries(tbl2Val).forEach(([key, value]) => {
                                if (typeof value === 'number') {
                                    usedArr.push(value);
                                }
                                else {
                                    table2Arr.push(value);
                                }
                            });
                        });
                        if (table2Arr.length > 0) {
                            dependencyArr.push(`${table2}:- ` + table2Arr.join(', '));
                        }
                    }
                }
                var filteredUsedArr = usedArr.filter(function (item, pos) {
                    return usedArr.indexOf(item) == pos;
                });
                if (filteredUsedArr.length > 0 && unUsedArr.length == 0) { // check if used arr exists is >0 and un used arr is empty
                    const dependencyStr = dependencyArr.join(", ");
                    return res.status(constants_1.Constants.BAD_REQ).json(responseBuilder_1.ResponseBuilder.badRequest(req.t("RECORD_EXISTS") + dependencyStr));
                }
                else if (unUsedArr.length == filteredUsedArr.length) { // check if both arrays are of same length
                    const dependencyStr = dependencyArr.join(", ");
                    req.body.ids = null;
                    req.body.isDependent = dependencyStr;
                    return true;
                }
                else {
                    const dependencyStr = dependencyArr.join(", ");
                    var finalArr = unUsedArr.filter(function (obj) { return filteredUsedArr.indexOf(obj) == -1; }); // to get record that is to be deleted
                    req.body.ids = finalArr.join(",");
                    req.body.isDependent = dependencyStr;
                    return true;
                }
            }
        });
    }
    static delay(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    /** Reverse the string*/
    static reverseString(str) {
        return str.split('').reverse().join('');
    }
}
exports.Utils = Utils;
/** Creating 6 digit random code for otp as well as referral code */
Utils.createRandomcode = (length, isOTP) => {
    let code = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // for referral code generator
    if (isOTP) {
        characters = "123456789"; // for otp generator
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
};
/** get regex for multiple names in sql (instead of LIKE) */
Utils.getRegex = (data, symbol = '|') => {
    return `REGEXP '${data.join(",").replace(/'/g, "\\'").replace(",", symbol)}'`;
};
/* convert returned string object from sql result to array of objects */
Utils.formatStringObjectsToArrayObjects = (result, type) => {
    if (result[type]) {
        result[type] = JSON.parse(result[type]);
    }
    else {
        result[type] = [];
    }
    return result[type];
};
/* Get image path for attachment */
Utils.getImagePath = (atchId, atchName) => {
    return `IF(${atchId} IS NULL, '', CONCAT('${process.env.IMAGE_PATH}', '/', ${atchName}))`;
};
/* Get Timestamop of date */
Utils.getTimeStamp = (date) => {
    return moment(date).unix();
};
/* Get round of 2 digit */
Utils.getRoundOfTwoDigit = (value) => {
    return +value.toFixed(2);
};
/** get skip and limit to avoid multiple code lines */
Utils.getSkipLimit = (page, recordsPerPage = null) => {
    let skip = 0;
    const limit = recordsPerPage ? recordsPerPage : constants_1.Constants.RECORDS_PER_PAGE; // for paginate records
    if (page) {
        skip = (page - 1) * limit;
    }
    return { limit, skip };
};
/** get time format */
Utils.getTimeFormat = () => {
    return moment().format(constants_1.Constants.TIME_FORMAT);
};
/** get date format with adding extra minutes */
Utils.getStandardDateFormatWithAddedMinutes = (value) => {
    return moment().add(value, "minutes").format(constants_1.Constants.DATE_FORMAT);
};
/* Encrypt text */
Utils.encryptText = (text) => {
    return bcrypt.hash(text, saltRounds);
};
/* Compare encrypted text */
Utils.compareEncryptedText = (text, hashText) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(text, hashText);
});
/* Check for empty values */
Utils.empty = (mixedVar) => {
    let i;
    let len;
    const emptyValues = ['undefined', null, 'null', false, 0, '', '0', undefined];
    for (i = 0, len = emptyValues.length; i < len; i += 1) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        const keys = Object.keys(mixedVar);
        return keys.length === 0;
    }
    return false;
};
/** return array with white space */
Utils.titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
};
/** Upload file from import explore functionality*/
Utils.upload = (files) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const imgArr = [];
        for (let i = 0; i < files.length; i++) {
            const timeStampInMs = new Date().getTime();
            const oldpath = files[i].path;
            const filename = timeStampInMs + '_' + files[i].originalname;
            const newpath = 'public/assets/' + timeStampInMs + '_' + files[i].originalname;
            mv(oldpath, newpath, (err) => {
                if (err) {
                    reject(err);
                }
                const obj = {
                    'filename': filename,
                    'originalname': files[i].originalname,
                    'path': newpath,
                };
                imgArr.push(filename);
                resolve(obj);
            });
        }
    }));
};
//# sourceMappingURL=utils.js.map