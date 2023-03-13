import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt
} from "class-validator";

import { Model } from "../../../model";

export class portalModel extends Model {

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public url: string;

  @IsOptional()
  @IsInt()
  public status: number;
  public created_by: number;

  
  constructor(body: any) {
    super();
    const {
      name,
      url,
      is_active,
      created_by
    } = body;
    this.name = name;
    this.url = url;
    this.status = is_active;
    this.created_by = created_by;
  }
}
export class portalEditModel extends Model {

  // @IsOptional()
  // public name: string;

  // @IsNotEmpty()
  // public url: string;

  // @IsOptional()
  // public slug: string;

  // @IsOptional()
  // @IsInt()
  // public status: number;
  // public updated_by: number;

  
  // constructor(body: any) {
  //   super();
  //   const {
  //     name,
  //     url,
  //     status,
  //     updated_by
  //   } = body;
  //   this.name = name;
  //   this.url = url;
  //   this.status = status;
  //   this.updated_by = updated_by;
  // }

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public url: string;

  @IsOptional()
  @IsInt()
  public status: number;
  public created_by: number;

  
  constructor(body: any) {
    super();
    const {
      name,
      url,
      is_active,
      created_by
    } = body;
    this.name = name;
    this.url = url;
    this.status = is_active;
    this.created_by = created_by;
  }
}
export class PortalsDeleteModel extends Model {

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

export class PortalStatusModel extends Model {

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

