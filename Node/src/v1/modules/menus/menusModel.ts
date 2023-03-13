import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt
} from "class-validator";

import { Model } from "../../../model";

export class MenusModel extends Model {

  @IsNotEmpty()
  public name: string;

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
      status
    } = body;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}

export class MenuDeleteModel extends Model {

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

export class MenuStatusModel extends Model {

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

