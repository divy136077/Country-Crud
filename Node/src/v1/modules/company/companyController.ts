import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { CompanyUtils } from './companyUtils';


export class CompanyController {
    private companyUtils: CompanyUtils = new CompanyUtils()

    //get all company data
    public getAll = async (req, res) => {
        try {
            console.log('controller called')

            const result = await this.companyUtils.getAll(req)
            console.log(result)
            res.json(result)

        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);

        }

    }

    //get single company
    public getOne = async (req, res) => {

        try {
            const id = req.params.id
            const result = await this.companyUtils.getOne(id, req)
            res.json(result)


        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);
        }
    }

    //insert company
    public create = async (req, res) => {
        try {
            const companyDetails = req.body
            const result = await this.companyUtils.create(companyDetails, req)
            res.json(result)


        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);

        }

    }

    //update company 
    public update = async (req, res) => {
        try {
            const companyDetails = req.body
            console.log('companyDetails', companyDetails)
            const id = req.params.id
            console.log(id)
            const result = await this.companyUtils.update(companyDetails, id, req)
            res.json(result)

        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);

        }
    }


    //inactive company
    public toggleStatus = async (req, res) => {
        try {
            console.log("body", req.body)


            const id = req.body.companyId
            const result = await this.companyUtils.toggleStatus(id, req)
            console.log("result = ", result)
            res.json(result)

        } catch (error) {
            res.json(error)
            throw ResponseBuilder.error(error);

        }

    }


    public delete = async (req, res) => {
        try {
            const id = req.params.id
            const result = await this.companyUtils.delete(id, req)
            console.log("result = ", result)
            res.json(result)

        } catch (error) {

        }
    }


    public getCompanyList = async (req,res)=>{
        try {
            const id = req.params.id
            // console.log(id)
            const result = await this.companyUtils.getCompanyList(id)
            // console.log("result = ", result)
            res.json(result)

        } catch (error) {

        }
    }

}
