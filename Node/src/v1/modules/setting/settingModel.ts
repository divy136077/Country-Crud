import {
    IsNotEmpty, IsOptional, IsInt, Min
  } from "class-validator";
  
  import { Model } from "../../../model";
  
  export class SettingModel extends Model {
  
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public value: string;
  
    @IsOptional()
    @IsInt()
    public status: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    public setting_type_id: number;

    //@IsNotEmpty()
    public setting_type_name: string;
   
    constructor(body: any) {
      super();
      const {
        name,
        value,
        setting_type_id,
        setting_type_name,
        status
      } = body;
      this.name = name;
      this.value = value;
      this.status = status;
      this.setting_type_id = setting_type_id;
      this.setting_type_name = setting_type_name;
    }
  }
  
  export class SettingDeleteModel extends Model {
  
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
  
  export class SettingStatusModel extends Model {
  
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
  
  