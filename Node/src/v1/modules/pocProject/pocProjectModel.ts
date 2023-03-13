import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class PocProjectModel extends Model {



  // @IsNotEmpty()
  public ProjectId: number;
  // @MaxLength(50)
  @IsNotEmpty()
  public POCName: string;
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

    console.log("Body = ",body)


    super();
    if (typeof body.data === 'string') {
      body = JSON.parse(body.data);
    }
    const {
      // ProjectId,
      POCName,
      Designation,
      PhoneNo,
      Email,
      IsActive,
      IsDeleted

    } = body.PocProject;
    // this.ProjectId=ProjectId;

    this.POCName = POCName;
    this.Designation = Designation;
    this.PhoneNo = PhoneNo;
    this.Email = Email;
    this.IsActive = IsActive;
    this.IsDeleted = IsDeleted;
  }
}

export class PocProjectDeleteModel extends Model {

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

export class PocProjectStatusModel extends Model {

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
    this.IsActive = IsActive

  }
}

