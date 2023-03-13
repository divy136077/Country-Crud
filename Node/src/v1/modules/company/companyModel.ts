import { Model } from "../../../model";
import { IsOptional, IsNotEmpty } from 'class-validator';

export class CompanyModel extends Model {
    public PriorityId: number;
    public OverseasId: number;
    public SectorId: string;
    public CountryType: string;
    public CountryId: number;
    public GeographyId: number;
    public StateId: number;
    public IndustryId: number;
    public EngagementMonthYear: string;
    @IsNotEmpty()
    public ClientGroupId: number;
    public CreatedDate: string;
    @IsNotEmpty()
    public CreatedBy: number;
    public ModifiedDate: string;
    public ModifiedBy: number;
    public IsActive: number;
    public IsDelete: number;

    constructor(body: any) {
        super();
        const {

            PriorityId,
            OverseasId,
            SectorId,
            CountryType,
            CountryId,
            GeographyId,
            StateId,
            IndustryId,
            EngagementMonthYear,
            ClientGroupId,
            CreatedDate,
            CreatedBy,
            ModifiedDate,
            ModifiedBy,
            IsActive,
            IsDelete,
            
        } = body;

        this.OverseasId = OverseasId,
        this.PriorityId = PriorityId,
        this.SectorId = SectorId,
        this.CountryType = CountryType,
        this.GeographyId = GeographyId,
        this.CountryId = CountryId,
        this.StateId = StateId,
        this.IndustryId = IndustryId,
        this.EngagementMonthYear = EngagementMonthYear,
        this.ClientGroupId = ClientGroupId,
        this.CreatedDate = CreatedDate,
        this.CreatedBy = CreatedBy,
        this.ModifiedDate = ModifiedDate,
        this.ModifiedBy = ModifiedBy,
        this.IsActive = IsActive,
        this.IsDelete = IsDelete
    }
}