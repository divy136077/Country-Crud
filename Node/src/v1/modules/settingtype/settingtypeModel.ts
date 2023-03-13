import {
    IsNotEmpty, IsOptional, IsInt, Min
  } from "class-validator";
  
  import { Model } from "../../../model";
  
  export class SettingTypeModel extends Model {
  
    @IsNotEmpty()
    public name: string;
  
    @IsOptional()
    @IsInt()
    public status: number;
   
    constructor(body: any) {
      super();
      const {
        name,
        status
      } = body;
      this.name = name;
      this.status = status;
    }
  }
  
  export class SettingTypeDeleteModel extends Model {
  
    @IsNotEmpty()
    public ids: string;
   
    constructor(body: any) {
      super();
      const {
        ids
      } = body;
      this.ids = ids;   
    }
  }
  
  export class SettingTypeStatusModel extends Model {
  
    @IsNotEmpty()
    public ids: string;
  
    @IsNotEmpty()
    @IsInt()
    public status: number;
   
    constructor(body: any) {
      super();
      const {
        ids,
        status
      } = body;
      this.ids = ids;
      this.status = status;
    }
  }
  
  