import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../../config/tables";

export class PaymentTermUtils {

    public async getAllPaymentTerm() {
        // query
        let query = `SELECT * from ${Tables.PAYMENTTERM} WHERE IsActive = 1 AND IsDeleted=0`;
        
        const totalItems = await My.query(query);

        return totalItems;
    }
}