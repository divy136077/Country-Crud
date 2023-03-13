import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class PocClientModel extends Model {
  @IsNotEmpty()
  public ClientGroupId: number;
  @IsNotEmpty()
  public PocTypeId: number;
  @MaxLength(50)
  @IsNotEmpty()
  public PocName: string;
  @MaxLength(50)
  @IsNotEmpty()
  public Designation: string;
  @IsNotEmpty()
  public PhoneNo: number;
  @IsNotEmpty()
  public Email: string;
  @IsOptional()
  public IsActive: boolean;
  @IsOptional()
  public IsDeleted: boolean;



  

  constructor(body: any) {
    super();
    if (typeof body.data === 'string') {
      body = JSON.parse(body.data);
    }
    const {
      ClientGroupId,
      PocTypeId,
      PocName,
      Designation,
      PhoneNo,
      Email,
      IsActive,
      IsDeleted
      
    } = body;
    this.ClientGroupId =ClientGroupId;
    this.PocTypeId=PocTypeId;
    this.PocName=PocName;
    this.Designation=Designation;
    this.PhoneNo =PhoneNo;
    this.Email =Email;
    this.IsActive=IsActive;
    this.IsDeleted=IsDeleted;
  }
}

export class PocClientDeleteModel extends Model {

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

export class PocClientStatusModel extends Model {

  @IsNotEmpty()
  public ids: string;
  @IsNotEmpty()
  IsActive: boolean;

 

  constructor(body: any) {
    super();
    const {
      ids,
      IsActive
    } = body;
    this.ids = ids;
    this.IsActive=IsActive
  
  }
}

