import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt
} from "class-validator";

import { Model } from "../../../model";

export class ModuleModel extends Model {

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public portal_id: number;

  @IsOptional()
  @MaxLength(255)
  public description: string;

  @IsOptional()
  @IsInt()
  public status: number;

  constructor(body: any) {
    super();
    const {
      name,
      description,
      portal_id,
      status
    } = body;
    this.name = name;
    this.description = description;
    this.portal_id = portal_id;
    this.status = status;
  }
}

export class ModuleDeleteModel extends Model {

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

export class ModuleStatusModel extends Model {

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

