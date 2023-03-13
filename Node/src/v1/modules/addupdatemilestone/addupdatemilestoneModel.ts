import { Model } from "../../../model";
import {
    IsNotEmpty
} from "class-validator";
export class AddUpadateMilestoneModel extends Model {

    @IsNotEmpty()
    public MileStoneName: string;

    @IsNotEmpty()
    public MileStonePercentageId: number;

    @IsNotEmpty()
    public DueDate: string;

    @IsNotEmpty()
    public IsActive: boolean;

    @IsNotEmpty()
    public IsDeleted: boolean;

    constructor(body: any) {
        super();
        const {
            MileStoneName,
            MileStonePercentageId,
            DueDate,
            IsActive,
            IsDeleted
        } = body;
        this.MileStoneName = MileStoneName;
        this.MileStonePercentageId = MileStonePercentageId;
        this.DueDate = DueDate;
        this.IsActive = IsActive;
        this.IsDeleted = IsDeleted;
    }
}

export class AddUpadateMilestoneDeleteModel extends Model {
    @IsNotEmpty()
    public ids: string;

    constructor(body: any) {
        super();
        const { ids } = body;
        this.ids = ids;
    }
}

export class ClientStatusModel extends Model {

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
