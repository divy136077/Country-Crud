import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class RightsModel extends Model {

  @MaxLength(50)
  @IsNotEmpty()
  public name: string;

  @MaxLength(191)
  @IsOptional()
  public slug: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  public module_id: number;

  @IsNotEmpty()
  public portal_id: number;

  @IsOptional()
  @IsInt()  
  public status: number;
 
  constructor(body: any) {
    super();
    const {
      name,
      slug,
      module_id,
      portal_id,
      status,
    } = body;
    this.name = name;
    this.slug = slug;
    this.module_id = module_id;
    this.portal_id = portal_id;
    this.status = status;
  }
}

export class RightsDeleteModel extends Model {

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

export class RightsStatusModel extends Model {

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

