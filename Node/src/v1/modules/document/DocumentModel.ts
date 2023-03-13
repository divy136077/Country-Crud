import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class DocumentModel extends Model {

  @IsNotEmpty()
  public PeriodFrom: any;

  @IsNotEmpty()
  public PeriodTo: any;

  @IsNotEmpty()
  public DocumentTypeId: number;

  constructor(body: any) {
    super();
    if (typeof body.data === 'string') {
      body = JSON.parse(body.data);
    }
    const {
      PeriodFrom,
      DocumentTypeId,
      PeriodTo
    } = body;
    this.PeriodFrom = PeriodFrom;
    this.DocumentTypeId = DocumentTypeId;
    this.PeriodTo = PeriodTo;
  }
}

