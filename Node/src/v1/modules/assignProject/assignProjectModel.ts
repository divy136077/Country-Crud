import {
  IsNotEmpty
} from "class-validator";

import { Model } from "../../../model";

export class AssignProjectModel extends Model {
  /**1 Project Details */
  @IsNotEmpty()
  public Name: string;

  @IsNotEmpty()
  public ProjectStatusId: number;

  @IsNotEmpty()
  public ProjectTypeId: string;

  @IsNotEmpty()
  public ProjectManagerId: string;

  @IsNotEmpty()
  public ProjectLeadId: string;

  @IsNotEmpty()
  public ProjectTeamMember: string;

  /**2 Other Project Parameters */

  @IsNotEmpty()
  public AllowInProductiveApp: boolean

  @IsNotEmpty()
  public TimeZoneId: string;

  @IsNotEmpty()
  public IMSDateFormat: string;

  /**3 project status report */

  @IsNotEmpty()
  public IsProjectStatusEnable: boolean;

  @IsNotEmpty()
  public ProjectStatusFrequencyId: string;

  @IsNotEmpty()
  public DayOfMonthId: string;

  @IsNotEmpty()
  public StarDateOfRecurrenceStatusReport: string;

  /**4 project review call  */

  @IsNotEmpty()
  public IsProjectReviewCallEnable: boolean;

  @IsNotEmpty()
  public ProjectReviewCallFrequencyId: string;

  @IsNotEmpty()
  public ReviewCallDayOfMonthId: string;

  @IsNotEmpty()
  public ReviewCallStarDateOfRecurrenceStatusReport: string;

  /**5 project CMMI */
  @IsNotEmpty()
  public IsCMMIProcess: boolean;

  /** 7 Add/Revision Max Cost */
  @IsNotEmpty()
  public ResourceCategoryId: string;

  @IsNotEmpty()
  public ResourceName: string;

  @IsNotEmpty()
  public BandId: string;

  @IsNotEmpty()
  public ResourceLevel: string;

  @IsNotEmpty()
  public TotalHours: string;

  @IsNotEmpty()
  public BandRate: string;

  @IsNotEmpty()
  public Amount: number;

  @IsNotEmpty()
  public IsActive: number;

  @IsNotEmpty()
  public IsDeleted: number;


  constructor(body: any) {
    super();
    const {
      Name,
      ProjectStatusId,
      ProjectTypeId,
      ProjectManagerId,
      ProjectLeadId,
      ProjectTeamMember,
      AllowInProductiveApp,
      TimeZoneId,
      IMSDateFormat,
      IsProjectStatusEnable,
      ProjectStatusFrequencyId,
      DayOfMonthId,
      StarDateOfRecurrenceStatusReport,
      IsProjectReviewCallEnable,
      ProjectReviewCallFrequencyId,
      ReviewCallDayOfMonthId,
      ReviewCallStarDateOfRecurrenceStatusReport,
      IsCMMIProcess,
      ResourceCategoryId,
      ResourceName,
      BandId,
      ResourceLevel,
      TotalHours,
      BandRate,
      Amount,
      IsActive,
      IsDeleted
    } = body;
    this.Name = Name;
    this.ProjectStatusId = ProjectStatusId;
    this.ProjectTypeId = ProjectTypeId;
    this.ProjectManagerId = ProjectManagerId;
    this.ProjectLeadId = ProjectLeadId;
    this.ProjectTeamMember = ProjectTeamMember;
    this.AllowInProductiveApp = AllowInProductiveApp;
    this.TimeZoneId = TimeZoneId;
    this.IMSDateFormat = IMSDateFormat;
    this.IsProjectStatusEnable = IsProjectStatusEnable;
    this.ProjectStatusFrequencyId = ProjectStatusFrequencyId;
    this.DayOfMonthId = DayOfMonthId;
    this.StarDateOfRecurrenceStatusReport = StarDateOfRecurrenceStatusReport;
    this.IsProjectReviewCallEnable = IsProjectReviewCallEnable;
    this.ProjectReviewCallFrequencyId = ProjectReviewCallFrequencyId;
    this.ReviewCallDayOfMonthId = ReviewCallDayOfMonthId;
    this.ReviewCallStarDateOfRecurrenceStatusReport = ReviewCallStarDateOfRecurrenceStatusReport;
    this.IsCMMIProcess = IsCMMIProcess;
    this.ResourceCategoryId = ResourceCategoryId;
    this.ResourceName = ResourceName;
    this.BandId = BandId;
    this.ResourceLevel = ResourceLevel;
    this.TotalHours = TotalHours;
    this.BandRate = BandRate;
    this.Amount = Amount;
    this.IsActive = IsActive;
    this.IsDeleted = IsDeleted
  }
}

