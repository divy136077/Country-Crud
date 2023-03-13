import {
  IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsInt, Min
} from "class-validator";

import { Model } from "../../../model";

export class PaymentMilestonetModel extends Model {




  public MilestoneName: string;
  public MilestoneAmountPercentage: number;
  public ExpectedDueDtae: string;





  constructor(body: any) {

    console.log("Body = ", body)


    super();
    if (typeof body.data === 'string') {
      body = JSON.parse(body.data);
    }


    const {
      MilestoneName,
      MilestoneAmountPercentage,
      ExpectedDueDtae
    } = body.PaymentMilestone


    // this.ProjectId=ProjectId;
    this.MilestoneName = MilestoneName,
      this.MilestoneAmountPercentage = MilestoneAmountPercentage,
      this.ExpectedDueDtae = ExpectedDueDtae

  }
}

export class PaymentMilestoneDeleteModel extends Model {

  @IsNotEmpty()
  public ids: string;

  constructor(body: any) {
    super();
    const {
      ids
    } = body.PaymentMilestone;
    this.ids = ids;
  }
}

export class PaymentMilestoneStatusModel extends Model {

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

