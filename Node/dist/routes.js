"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express = require("express");
const l10n = require("jm-ez-l10n");
const languageRoute_1 = require("./v1/modules/language/languageRoute");
const menusRoute_1 = require("./v1/modules/menus/menusRoute");
const portalsRoute_1 = require("./v1/modules/portals/portalsRoute");
const moduleRoute_1 = require("./v1/modules/module/moduleRoute");
const rightsRoute_1 = require("./v1/modules/rights/rightsRoute");
const roleRoute_1 = require("./v1/modules/role/roleRoute");
const settingRoute_1 = require("./v1/modules/setting/settingRoute");
const settingtypeRoute_1 = require("./v1/modules/settingtype/settingtypeRoute");
const userRoute_1 = require("./v1/modules/user/userRoute");
const assignProjectRoute_1 = require("./v1/modules/assignProject/assignProjectRoute");
const projectmanagerRoute_1 = require("./v1/modules/projectmanager/projectmanagerRoute");
const projectleadRoute_1 = require("./v1/modules/projectlead/projectleadRoute");
const projectteammemberRoute_1 = require("./v1/modules/projectteammember/projectteammemberRoute");
const timezoneRoute_1 = require("./v1/modules/timezone/timezoneRoute");
const resourcecategoryRoute_1 = require("./v1/modules/resourcecategory/resourcecategoryRoute");
const resourcebandRoute_1 = require("./v1/modules/resourceband/resourcebandRoute");
const milestonepercentageRoute_1 = require("./v1/modules/milestonepercentage/milestonepercentageRoute");
const resourcenameRoute_1 = require("./v1/modules/resourcename/resourcenameRoute");
const dayofmonthRoute_1 = require("./v1/modules/dayofmonth/dayofmonthRoute");
const projectstatusfrequencyRoute_1 = require("./v1/modules/projectstatusfrequency/projectstatusfrequencyRoute");
const projectreviewcallfrequencyRoute_1 = require("./v1/modules/projectreviewcallfrequency/projectreviewcallfrequencyRoute");
const addupdatemilestoneRoute_1 = require("./v1/modules/addupdatemilestone/addupdatemilestoneRoute");
const companyRoute_1 = require("./v1/modules/company/companyRoute");
const SectorRoute_1 = require("./v1/modules/sector/SectorRoute");
const CountryRoute_1 = require("./v1/modules/country/CountryRoute");
const ClientTypeRoute_1 = require("./v1/modules/clienttype/ClientTypeRoute");
const practiceRoute_1 = require("./v1/modules/practices/practiceRoute");
const FocusAreaRoute_1 = require("./v1/modules/focusArea/FocusAreaRoute");
const PracticeHeadRoute_1 = require("./v1/modules/practiceHead/PracticeHeadRoute");
const ServiceCategoryRoute_1 = require("./v1/modules/serviceCategory/ServiceCategoryRoute");
const ServiceLinesRoute_1 = require("./v1/modules/serviceLine/ServiceLinesRoute");
const GovernanceManagementRoute_1 = require("./v1/modules/governanceManagement/GovernanceManagementRoute");
const AccountManagerRoute_1 = require("./v1/modules/accountManager/AccountManagerRoute");
const BDMRoute_1 = require("./v1/modules/bdm/BDMRoute");
const GeographyRoute_1 = require("./v1/modules/geography/GeographyRoute");
const ProjectPriorityRoute_1 = require("./v1/modules/projectPriority/ProjectPriorityRoute");
const WorkOrderTypeRoute_1 = require("./v1/modules/workOrderType/WorkOrderTypeRoute");
const PriorityRoute_1 = require("./v1/modules/priority/PriorityRoute");
const SignificanceRoute_1 = require("./v1/modules/significance/SignificanceRoute");
const projecttypeRoute_1 = require("./v1/modules/projecttype/projecttypeRoute");
const projectstatusRoute_1 = require("./v1/modules/projectstatus/projectstatusRoute");
const projectRoute_1 = require("./v1/modules/project/projectRoute");
const IndustryRoute_1 = require("./v1/modules/industry/IndustryRoute");
const StateRoute_1 = require("./v1/modules/state/StateRoute");
const PocTypeRoute_1 = require("./v1/modules/poctype/PocTypeRoute");
const DomesticRoute_1 = require("./v1/modules/domestic/DomesticRoute");
const TaxRoute_1 = require("./v1/modules/tax/TaxRoute");
const CurrencyRoute_1 = require("./v1/modules/currency/CurrencyRoute");
const InvoiceGenerateFromRoute_1 = require("./v1/modules/Invoicegeneratefrom/InvoiceGenerateFromRoute");
const BankDetailRoute_1 = require("./v1/modules/bankdetail/BankDetailRoute");
const PaymentTermRoute_1 = require("./v1/modules/paymentterms/PaymentTermRoute");
const InvoicesentbyRoute_1 = require("./v1/modules/invoicesentby/InvoicesentbyRoute");
const InvoiceSentViaRoute_1 = require("./v1/modules/invoicesentvia/InvoiceSentViaRoute");
const pocClientRoute_1 = require("./v1/modules/pocclient/pocClientRoute");
const DocumentRoute_1 = require("./v1/modules/documenttype/DocumentRoute");
const DocumentRoute_2 = require("./v1/modules/document/DocumentRoute");
const ClientGroupRoute_1 = require("./v1/modules/clientgroup/ClientGroupRoute");
const ClientRoute_1 = require("./v1/modules/client/ClientRoute");
const pocProjectRoute_1 = require("./v1/modules/pocProject/pocProjectRoute");
const paymentMilestoneRoute_1 = require("./v1/modules/paymentMilestone/paymentMilestoneRoute");
class Routes {
    constructor(NODE_ENV) {
        switch (NODE_ENV) {
            case "production":
                this.basePath = "/app/dist";
                break;
            case "development":
                this.basePath = "/app/public";
                break;
        }
    }
    defaultRoute(req, res) {
        res.json({
            message: "Hello !",
        });
    }
    path() {
        const router = express.Router();
        router.use("/user", userRoute_1.UserRoute);
        router.use("/module", moduleRoute_1.ModuleRoute);
        router.use("/rights", rightsRoute_1.RightsRoute);
        router.use("/role", roleRoute_1.RoleRoute);
        router.use("/menu", menusRoute_1.MenuRoute);
        router.use("/portals", portalsRoute_1.PortalsRoute);
        router.use("/setting-type", settingtypeRoute_1.SettingTypeRoute);
        router.use("/setting", settingRoute_1.SettingRoute);
        router.use("/language", languageRoute_1.LanguageRoute);
        router.use("/assign-project", assignProjectRoute_1.AssignProjectRoute);
        router.use("/project-status", projectstatusRoute_1.ProjectStatusRoute);
        router.use("/project-type", projecttypeRoute_1.ProjectTypeRoute);
        router.use("/project-manager", projectmanagerRoute_1.ProjectManagerRoute);
        router.use("/project-lead", projectleadRoute_1.ProjectLeadRoute);
        router.use("/project-team-member", projectteammemberRoute_1.ProjectTeamMemberRoute);
        router.use("/time-zone", timezoneRoute_1.TimeZoneRoute);
        router.use("/resource-category", resourcecategoryRoute_1.ResourceCategoryRoute);
        router.use("/resource-band", resourcebandRoute_1.ResourceBandRoute);
        router.use("/milestone-percentage", milestonepercentageRoute_1.MilestonePercentageRoute);
        router.use("/resource-name", resourcenameRoute_1.ResourceNameRoute);
        router.use("/day-of-month", dayofmonthRoute_1.DayOfMonthRoute);
        router.use("/project-status-frequency", projectstatusfrequencyRoute_1.ProjectStatusFrequencyRoute);
        router.use("/project-call-frequency", projectreviewcallfrequencyRoute_1.ProjectReviewCallFrequencyRoute);
        router.use("/milestone", addupdatemilestoneRoute_1.AddUpadateMilestoneRoute);
        router.use("/company", companyRoute_1.CompanyRoute);
        router.use("/company", companyRoute_1.CompanyRoute);
        router.use("/projectstatus", projectstatusRoute_1.ProjectStatusRoute);
        router.use("/currency", CurrencyRoute_1.CurrencyRoute);
        router.use("/poctype", PocTypeRoute_1.PocTypeRoute);
        router.use("/sector", SectorRoute_1.SectorRoute);
        router.use("/country", CountryRoute_1.CountryRoute);
        router.use("/client-type", ClientTypeRoute_1.ClientTypeRoute);
        router.use("/practice", practiceRoute_1.PracticeRoute);
        router.use("/focusarea", FocusAreaRoute_1.FocusAreaRoute);
        router.use("/practicehead", PracticeHeadRoute_1.PracticeHeadRoute);
        router.use("/service-category", ServiceCategoryRoute_1.ServiceCategoryRoute);
        router.use("/service-lines", ServiceLinesRoute_1.ServiceLinesRoute);
        router.use("/governance-management", GovernanceManagementRoute_1.GovernanceManagementRoute);
        router.use("/account-manager", AccountManagerRoute_1.AccountManagerRoute);
        router.use("/bdm", BDMRoute_1.BDMRoute);
        router.use("/geography", GeographyRoute_1.GeographyRoute);
        router.use("/project-priority", ProjectPriorityRoute_1.projectPriorityRoute);
        router.use("/work-order-type", WorkOrderTypeRoute_1.WorkOrderTypeRoute);
        router.use("/priority", PriorityRoute_1.PriorityRoute);
        router.use("/significance", SignificanceRoute_1.SignificanceRoute);
        router.use("/industry", IndustryRoute_1.IndustryRoute);
        router.use("/state", StateRoute_1.StateRoute);
        router.use("/poctype", PocTypeRoute_1.PocTypeRoute);
        router.use("/domestic", DomesticRoute_1.DomesticRoute);
        router.use("/tax", TaxRoute_1.TaxRoute);
        router.use("/currency", CurrencyRoute_1.CurrencyRoute);
        router.use("/invoice-generate-from", InvoiceGenerateFromRoute_1.InvoiceGenerateFromRoute);
        router.use("/bank-detail", BankDetailRoute_1.BankDetailRoute);
        router.use("/paymentterm", PaymentTermRoute_1.PaymentTermRoute);
        router.use("/invoicesentby", InvoicesentbyRoute_1.InvoiceSentByRoute);
        router.use("/invoicesentvia", InvoiceSentViaRoute_1.InvoiceSentViaRoute);
        router.use("/documenttype", DocumentRoute_1.DocumentTypeRoute);
        router.use("/poc", pocClientRoute_1.PocClientRoute);
        router.use("/document", DocumentRoute_2.DocumentRoute);
        router.use("/clientgroup", ClientGroupRoute_1.ClientGroupRoute);
        router.use("/client", ClientRoute_1.ClientRoute);
        router.use("/project", projectRoute_1.ProjectRoute);
        router.use("/industry", IndustryRoute_1.IndustryRoute);
        router.use("/state", StateRoute_1.StateRoute);
        router.use("/poctype", PocTypeRoute_1.PocTypeRoute);
        router.use("/currency", CurrencyRoute_1.CurrencyRoute);
        router.use("/poc", pocClientRoute_1.PocClientRoute);
        router.use("/document", DocumentRoute_2.DocumentRoute);
        router.use("/pocproject", pocProjectRoute_1.PocProjectRoute);
        router.use('/paymentmilestone', paymentMilestoneRoute_1.ProjectMilestoneRoute);
        router.all("/*", (req, res) => {
            return res.status(404).json({ error: l10n.t("ERR_URL_NOT_FOUND") });
        });
        return router;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map