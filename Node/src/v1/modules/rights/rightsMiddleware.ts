import { Response } from "express";
import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Constants } from '../../../config/constants';

export class RightsMiddleware {
  
  /** Check if rights already exist in the database */
  public IsRightsExists = async (req: any, res: Response, next: () => void) => {
    
    let idWhere = `1=1 `;
    if (req.params.id) {
      idWhere = ` id != ${req.params.id}`
    }

    const rights: boolean = await My.first(Tables.RIGHTS, ["id"], `${idWhere} AND name = ? AND module_id = ? AND status=1 AND deleted=0`, [req.body.name, req.body.module_id]);
    if (rights) {      
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("RIGHTS_EXISTS")));
    } else {
        next();
    }
  }

  /** Check if the id is valid or not */
  public IsValidId = async (req: any, res: Response, next: () => void) => {
       
    if (isNaN(req.params.id)) {
      return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
    } else {
        next();
    }
  }
  /**
   * Function to check if module is mapped with any other dependent module or not
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
   public checkDBDependency = async (req: any, res: Response, next: () => void) => {
       
    let idWhere = `1=1 `;
    if(req.params.id){ // for single delete
      const right = await My.first(Tables.RIGHTS, ["slug"], "id = ? AND status != 2", [req.params.id]);
      if(right){
        const slug = right.slug;
        
        const role = await My.query(`SELECT * from ${Tables.ROLES} WHERE status = 1 `);
        var dependencyArr = new Array();
        var dependencyFlag = 0;

        if (role) {  
          role.forEach(roleDbVal => {
            if(roleDbVal['rights'].length > 0 && roleDbVal['rights'] != '[]'){
              const roleJsonValue = JSON.parse(roleDbVal['rights']);
              Object.entries(roleJsonValue[0]).forEach(([key, roleValue]) => {
                const exists = Array.isArray(roleValue) ? roleValue.includes(slug) : false;
                if(exists == true){
                  dependencyArr.push(roleDbVal['name']);
                  dependencyFlag = 1;
                }
              });
            }
          });
          if(dependencyFlag == 0){
            next();
          }else{
            const dependencyStr = slug +":- "+ dependencyArr.join(", ");
            req.params.id = null;
            req.body.isDependent = dependencyStr;
            next();
            // return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("RECORD_EXISTS")+dependencyStr));
          }
          
        } else {
            next();
        }
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
      }
      
    }

    if(req.body.ids){ // for multiple delete/toggle
      idWhere = ` id IN (${req.body.ids})`;

      const right = await My.query(`SELECT id, slug from ${Tables.RIGHTS} WHERE status != 2 AND ${idWhere}`);
      
      const role = await My.query(`SELECT * from ${Tables.ROLES} WHERE status = 1 `);
      var dependentTblArr = new Array();
      var unUsedArr = new Array();
      var usedArr = new Array();
     
      if(right){
        if (role) { 
          right.forEach(rightDbVal => {
            var dependencyFlag = 0;
            var tableArr = new Array();
            const slug = rightDbVal.slug;
            
            role.forEach(roleDbVal => {
              if(roleDbVal['rights'].length > 0 && roleDbVal['rights'] != '[]'){ // check if rights exists in roles
                const roleJsonValue = JSON.parse(roleDbVal['rights']);
                Object.entries(roleJsonValue[0]).forEach(([key, roleValue]) => { // for array of obj value in rights field
                  const exists = Array.isArray(roleValue) ? roleValue.includes(slug) : false; // if slug from rights matches with rights in roles
                  if(exists == true){
                    tableArr.push(roleDbVal['name']);
                    dependencyFlag = 1;
                    usedArr.push(rightDbVal.id); // for records exists
                  }else{
                    unUsedArr.push(rightDbVal.id); // for records that don't
                  }
                });
              }
            });
            if(dependencyFlag == 1){
              dependentTblArr.push(slug +":- "+tableArr.join(", ")); // final dependent records arr
            }
          });
          
          if(dependencyFlag == 0){
            next();
          }else{
            if(dependentTblArr.length > 1){
              var dependencyStr = dependentTblArr.join(" | ");
            }else{
              var dependencyStr = dependentTblArr.join("");
            }
            
            var filteredUsedArr = usedArr.filter(function(item, pos){ // remove duplicate records for records exists array
              return usedArr.indexOf(item)== pos; 
            });
            var filteredUnUsedArr = unUsedArr.filter(function(item, pos){ // remove duplicate records for records that don't
              return unUsedArr.indexOf(item)== pos; 
            });
            
            if(filteredUsedArr.length > 0  && filteredUnUsedArr.length == 0){ // check if used arr exists is >0 and un used arr is empty
              return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("RECORD_EXISTS")+dependencyStr));
            }else if(filteredUnUsedArr.length == filteredUsedArr.length ){ // check if both arrays are of same length
              req.body.ids = null;
              req.body.isDependent = dependencyStr;
              next();
            }else{
              var finalArr = filteredUnUsedArr.filter(function(obj) { return filteredUsedArr.indexOf(obj) == -1; }); // to get record that is to be deleted
              req.body.ids = finalArr.join(",");
              req.body.isDependent = dependencyStr;
              next();
            }
          }
        } else {
          next();
        }
      }else{
        return res.status(Constants.BAD_REQ).json(ResponseBuilder.badRequest( req.t("INVAILD_ID")));
      }
    }
  }

}