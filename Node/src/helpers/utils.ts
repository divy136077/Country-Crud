import { Constants } from "../config/constants";
import * as moment from "moment";
import * as dotenv from "dotenv";
const bcrypt = require('bcryptjs');
import * as Sql from "jm-ez-mysql";
import * as mv from 'mv';
import * as jwt from "jsonwebtoken";
import { Response } from "express";
import { ResponseBuilder } from "./responseBuilder";
import * as My from "jm-ez-mysql";

const headers = {
    name: '', // any string
    mobile: 1, // any number
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // RegExp
    _country: '', // add '_' as first character of the key to indicate as optional
    type: '',
    date: '',
};
dotenv.config();

const saltRounds = 10;
export class Utils {
    /** Creating 6 digit random code for otp as well as referral code */
    public static createRandomcode = (length: number, isOTP: boolean) => {
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
    }

    /** get regex for multiple names in sql (instead of LIKE) */
    public static getRegex = (data: string[], symbol: string = '|') => {
        return `REGEXP '${data.join(",").replace(/'/g, "\\'").replace(",", symbol)}'`;
    }

    /* convert returned string object from sql result to array of objects */
    public static formatStringObjectsToArrayObjects = (result: any, type: string) => {
        if (result[type]) {
            result[type] = JSON.parse(result[type]);
        } else {
            result[type] = [];
        }
        return result[type];
    }

    /* Get image path for attachment */
    public static getImagePath = (atchId: string, atchName: string) => {
        return `IF(${atchId} IS NULL, '', CONCAT('${process.env.IMAGE_PATH}', '/', ${atchName}))`;
    }

    /* Get Timestamop of date */
    public static getTimeStamp = (date: string) => {
        return moment(date).unix();
    }

    /* Get round of 2 digit */
    public static getRoundOfTwoDigit = (value: number) => {
        return +value.toFixed(2);
    }

    public static async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /** get skip and limit to avoid multiple code lines */
    public static getSkipLimit = (page: number, recordsPerPage: number = null) => {
        let skip = 0;
        const limit = recordsPerPage ? recordsPerPage : Constants.RECORDS_PER_PAGE; // for paginate records
        if (page) {
            skip = (page - 1) * limit;
        }
        return { limit, skip };
    }

    /** get time format */
    public static getTimeFormat = () => {
        return moment().format(Constants.TIME_FORMAT);
    }

    /** get date format with adding extra minutes */
    public static getStandardDateFormatWithAddedMinutes = (value: number) => {
        return moment().add(value, "minutes").format(Constants.DATE_FORMAT)
    }

    /* Encrypt text */
    public static encryptText = (text) => {
        return bcrypt.hash(text, saltRounds);
    };

    /* Compare encrypted text */
    public static compareEncryptedText = async (text, hashText) => {
        return await bcrypt.compare(text, hashText);
    };

    /* Check for empty values */
    public static empty = (mixedVar) => {
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
    public static titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string

        return splitStr.join(' ');
    }

    /** Reverse the string*/
    public static reverseString(str: any) {
        return str.split('').reverse().join('');
    }

    /** Create slug */
    public slug = async (title?, fieldName?, id = null, tableName?) => {
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const query = { status: 1 };
        let where = '';
        if (slug) {
            const likePatten = `LIKE '%${slug.replace(/'/g, "")}%'`;
            where += ` slug ${likePatten} AND status != 2 `;
        }
        const obj = { where: query };
        const templateData = await Sql.query(`SELECT slug FROM ${tableName} WHERE  slug LIKE '%${slug}%' AND status != 2`);
        const originalSlug = slug;
        const latestSlug = this.recursiveSlug(templateData, originalSlug, slug, 0, id);

        return latestSlug;
    }

    /** Recursive the string from slug */
    public recursiveSlug = (data?, originalSlug?, slug?, number?, id?) => {
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
        } else {
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
    }

    /** Upload file from import explore functionality*/
    public static upload = (files) => {
        return new Promise(async (resolve, reject) => {
            const imgArr = [];
            for (let i = 0; i < files.length; i++) {
                const timeStampInMs = new Date().getTime();
                const oldpath = files[i].path;
                const filename = timeStampInMs + '_' + files[i].originalname;
                const newpath = 'public/assets/' + timeStampInMs + '_' + files[i].originalname;
                mv(oldpath, newpath, (err) => {
                    if (err) { reject(err); }
                    const obj = {
                        'filename': filename,
                        'originalname': files[i].originalname,
                        'path': newpath,
                    };
                    imgArr.push(filename);
                    resolve(obj);
                });
            }
        });
    }
    
    /** Upload profile picture */
    public uploadProfile = (files: any) => {
        return new Promise(async (resolve, reject) => {
            var imgArr: any;
            const timeStampInMs = new Date().getTime();
            const oldpath = files.path;
            const filename = timeStampInMs + '_' + files.originalname;
            const newpath = 'public/profile_images/' + timeStampInMs + '_' + files.originalname;
            mv(oldpath, newpath, (err) => {
                if (err) { reject(err); }
                const obj = {
                    'filename': filename,
                    'originalname': files.originalname,
                    'path': newpath,
                };
                imgArr = filename;
                resolve(imgArr);
            });
        });
    }

    /**
     * Authorise token from headers and return user id
     */
     public authToken = async (authorization: any) => {
        let userId;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET, (err, token) => {
                if (err) {
                    
                } else {
                    userId = token.device_token.id;
                }
            });
        }
        if(userId == undefined) {
            userId = 0;
        }
        
        return userId;
    }

    /**
     * To check the dependency of table1 with table2 and return dependent values
     */
    public checkDbDependency = async( req: any, res: Response, table1?, table2?, tbl1field?, tbl2field?, pkId?) => {
        let idWhere = `1=1 `;
    
        if(req.params.id){ // for single delete
            if(pkId == 'rold_id'){
                idWhere = `FIND_IN_SET(${req.params.id}, ${pkId})`;
            }else{
                idWhere = ` ${pkId} = ${req.params.id}`;
            }
            var dependencyArr = new Array();
            if(table1){
                const tbl1: boolean = await My.first(table1, [tbl1field], `${idWhere} AND status=1`);
                if (tbl1) { 
                    dependencyArr.push(`${table1}:- ` +tbl1[tbl1field]);
                }
            } 
            
            if(table2){
                const tbl2: boolean = await My.first(table2, [tbl2field], `${idWhere} AND status=1`);
                if (tbl2) {      
                    dependencyArr.push(`${table2}:- ` +tbl2[tbl2field]);
                } 
            }
            if(dependencyArr.length > 0){
                req.params.id = null;
                const dependencyStr = dependencyArr.join(", ");
                req.body.isDependent = dependencyStr;

                return true;
            }else {
                return true;
            }
        }
        
        if(req.body.ids){ // for multiple delete/toggle
            var dependencyArr = new Array();
            var usedArr = new Array();
            var unUsedArr = new Array();
            if(pkId == 'rold_id'){
                idWhere = `FIND_IN_SET(${req.params.id}, ${pkId})`;
            }else{
                idWhere = ` ${pkId} IN (${req.body.ids})`;
            }
            
            var ids = req.body.ids.split(",");
            ids.forEach(idVal => {
                unUsedArr.push(Number(idVal));
            });
            
            if(table1){
                const tbl1 = await My.query(`SELECT ${pkId}, ${tbl1field} from ${table1} WHERE status != 2 AND ${idWhere}`);
                
                if (tbl1) {  
                    var table1Arr = new Array();
                    tbl1.forEach(tbl1Val => {
                        Object.entries(tbl1Val).forEach(([key, value]) => {
                            if(typeof value === 'number') {
                                usedArr.push(value);
                            }else if(key == 'role_id' && typeof value === 'string') {
                                value = value.split(",")[0];
                                usedArr.push((Number(value)));
                            }
                            else{
                                table1Arr.push(value);
                            }
                        });
                    });
                    if(table1Arr.length > 0){
                        var filteredtable1Arr = table1Arr.filter(function(item, pos){ // remove duplicate records for records exists array
                            return table1Arr.indexOf(item)== pos; 
                        });
                        dependencyArr.push(`${table1}:- ` +filteredtable1Arr.join(', ') );
                    }
                }
            }
            if(table2){
                const tbl2 = await My.query(`SELECT ${pkId}, ${tbl2field} from ${table2} WHERE status != 2 AND ${idWhere}`);
                if (tbl2) {   
                    var table2Arr = new Array();
                    tbl2.forEach(tbl2Val => {
                        Object.entries(tbl2Val).forEach(([key, value]) => {
                            if(typeof value === 'number') {
                                usedArr.push(value);
                            }else{
                                table2Arr.push(value);
                            }
                        });
                    });
                    if(table2Arr.length > 0){
                        dependencyArr.push(`${table2}:- ` +table2Arr.join(', ') );
                    }
                }
            }
            var filteredUsedArr = usedArr.filter(function(item, pos){ // remove duplicate records for records exists array
                return usedArr.indexOf(item)== pos; 
            });
            
            if(filteredUsedArr.length > 0  && unUsedArr.length == 0){ // check if used arr exists is >0 and un used arr is empty
                const dependencyStr = dependencyArr.join(", ");

                return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("RECORD_EXISTS")+dependencyStr));
            }else if(unUsedArr.length == filteredUsedArr.length ){ // check if both arrays are of same length
                const dependencyStr = dependencyArr.join(", ");
                req.body.ids = null;
                req.body.isDependent = dependencyStr;

                return true;
            }else{
                const dependencyStr = dependencyArr.join(", ");
                var finalArr = unUsedArr.filter(function(obj) { return filteredUsedArr.indexOf(obj) == -1; }); // to get record that is to be deleted
                req.body.ids = finalArr.join(",");
                req.body.isDependent = dependencyStr;

                return true;
            }
        }
    }
}
