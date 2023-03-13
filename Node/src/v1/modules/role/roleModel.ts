import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class RoleModel extends Model {

  @MaxLength(50)
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public rights: string;

  @IsOptional()
  @IsInt()
  public status: number;

  constructor(body: any) {
    super();
    const {
      name,
      rights,
      status
    } = body;
    this.name = name;
    this.rights = rights;
    this.status = status;
  }
}

export class RoleDeleteModel extends Model {

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

export class RoleStatusModel extends Model {

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

