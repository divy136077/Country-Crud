import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class LanguageModel extends Model {

  @MaxLength(50)
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  // tslint:disable-next-line: variable-name
  public locale: string;

  @IsOptional()
  @IsInt()
  public status: number;

  constructor(body: any) {
    super();
    if (typeof body.data === 'string') {
      body = JSON.parse(body.data);
    }
    const {
      name,
      locale,
      status
    } = body;
    this.name = name;
    this.locale = locale;
    this.status = status;
  }
}

export class LanguageDeleteModel extends Model {

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

export class LanguageStatusModel extends Model {

  @IsNotEmpty()
  public ids: string;

  @IsNotEmpty()
  public status: boolean;

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

