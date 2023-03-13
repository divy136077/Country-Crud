"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const model_1 = require("../../../model");
class ProjectModel extends model_1.Model {
    // public PriorityId: number;
    // public OverseasId: number;
    // public SectorId: string;
    // public CountryType: string;
    // public CountryId: number;
    // public GeographyId: number;
    // public StateId: number;
    // public IndustryId: number;
    // public EngagementMonthYear: string;
    // @IsNotEmpty()
    // public ClientGroupId: number;
    // public CreatedDate: string;
    // @IsNotEmpty()
    // public CreatedBy: number;
    // public ModifiedDate: string;
    // public ModifiedBy: number;
    // public IsActive: number;
    // public IsDelete: number;
    constructor(body) {
        super();
        // const {
        // PriorityId,
        // OverseasId,
        // SectorId,
        // CountryType,
        // CountryId,
        // GeographyId,
        // StateId,
        // IndustryId,
        // EngagementMonthYear,
        // ClientGroupId,
        // CreatedDate,
        // CreatedBy,
        // ModifiedDate,
        // ModifiedBy,
        // IsActive,
        // IsDelete,
        // } = body;
        const { POCName, Designation, PhoneNo, Email } = JSON.parse(body.allData).PocProject;
        const { MilestoneName, MilestoneAmountPercentage, ExpectedDueDtae } = JSON.parse(body.allData).PaymentMilestone;
        const { WorkOrderNumber, WorkOrderDate, WorkOrderAmount, CurrencyId, OneTimeInvoice, AdvanceMilestone, AutoRenewal, } = JSON.parse(body.allData).workOrder;
        const { ProjectPractise, PractiseHead, Name, ProjectPriorityId, ProjectTypeId, FocusAreaId, ServiceCategoryId, ServiceLinesId, ProjectStatusId, StartDate, EndDate, SectorId, OverseasID, GeographyId, CountryId, StateId, IndustryId, Priority } = JSON.parse(body.allData).projectData;
        console.log(body.PocProject);
        this.POCName = POCName,
            this.Designation = Designation,
            this.PhoneNo = PhoneNo,
            this.Email = Email,
            this.MilestoneName = MilestoneName,
            this.MilestoneAmountPercentage = MilestoneAmountPercentage,
            this.ExpectedDueDtae = ExpectedDueDtae,
            this.WorkOrderNumber = WorkOrderNumber,
            this.WorkOrderDate = WorkOrderDate,
            this.WorkOrderAmount = WorkOrderAmount,
            this.CurrencyId = CurrencyId,
            this.OneTimeInvoice = OneTimeInvoice,
            this.AdvanceMilestone = AdvanceMilestone,
            this.AutoRenewal = AutoRenewal,
            // this.WorkOrderFileName =WorkOrderFileName ,
            this.ProjectPractise = ProjectPractise,
            this.PractiseHead = PractiseHead,
            this.Name = Name,
            this.ProjectPriorityId = ProjectPriorityId,
            this.ProjectTypeId = ProjectTypeId,
            this.FocusAreaId = FocusAreaId,
            this.ServiceCategoryId = ServiceCategoryId,
            this.ServiceLinesId = ServiceLinesId,
            this.ProjectStatusId = ProjectStatusId,
            this.StartDate = StartDate,
            this.EndDate = EndDate,
            this.SectorId = SectorId,
            this.OverseasID = OverseasID,
            this.GeographyId = GeographyId,
            this.CountryId = CountryId,
            this.StateId = StateId,
            this.IndustryId = IndustryId,
            this.Priority = Priority;
        // this.OverseasId = OverseasId,
        //     this.PriorityId = PriorityId,
        //     this.SectorId = SectorId,
        //     this.CountryType = CountryType,
        //     this.GeographyId = GeographyId,
        //     this.CountryId = CountryId,
        //     this.StateId = StateId,
        //     this.IndustryId = IndustryId,
        //     this.EngagementMonthYear = EngagementMonthYear,
        //     this.ClientGroupId = ClientGroupId,
        //     this.CreatedDate = CreatedDate,
        //     this.CreatedBy = CreatedBy,
        //     this.ModifiedDate = ModifiedDate,
        //     this.ModifiedBy = ModifiedBy,
        //     this.IsActive = IsActive,
        //     this.IsDelete = IsDelete
    }
}
exports.ProjectModel = ProjectModel;
//# sourceMappingURL=projectModel.js.map