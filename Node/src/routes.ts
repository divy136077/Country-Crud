import express = require("express");
import * as l10n from "jm-ez-l10n";
import { LanguageRoute } from "./v1/modules/language/languageRoute";
import { MenuRoute } from "./v1/modules/menus/menusRoute";
import { PortalsRoute } from "./v1/modules/portals/portalsRoute";
import { ModuleRoute } from "./v1/modules/module/moduleRoute";
import { RightsRoute } from "./v1/modules/rights/rightsRoute";
import { RoleRoute } from "./v1/modules/role/roleRoute";
import { SettingRoute } from "./v1/modules/setting/settingRoute";
import { SettingTypeRoute } from "./v1/modules/settingtype/settingtypeRoute";
import { UserRoute } from "./v1/modules/user/userRoute";
import { AssignProjectRoute } from "./v1/modules/assignProject/assignProjectRoute";
import { ProjectManagerRoute } from "./v1/modules/projectmanager/projectmanagerRoute";
import { ProjectLeadRoute } from "./v1/modules/projectlead/projectleadRoute";
import { ProjectTeamMemberRoute } from "./v1/modules/projectteammember/projectteammemberRoute";
import { TimeZoneRoute } from "./v1/modules/timezone/timezoneRoute";
import { ResourceCategoryRoute } from "./v1/modules/resourcecategory/resourcecategoryRoute";
import { ResourceBandRoute } from "./v1/modules/resourceband/resourcebandRoute";
import { MilestonePercentageRoute } from "./v1/modules/milestonepercentage/milestonepercentageRoute";
import { ResourceNameRoute } from "./v1/modules/resourcename/resourcenameRoute";
import { DayOfMonthRoute } from "./v1/modules/dayofmonth/dayofmonthRoute";
import { ProjectStatusFrequencyRoute } from "./v1/modules/projectstatusfrequency/projectstatusfrequencyRoute";
import { ProjectReviewCallFrequencyRoute } from "./v1/modules/projectreviewcallfrequency/projectreviewcallfrequencyRoute";
import { AddUpadateMilestoneRoute } from "./v1/modules/addupdatemilestone/addupdatemilestoneRoute";
import { CompanyRoute } from "./v1/modules/company/companyRoute"
import { SectorRoute } from "./v1/modules/sector/SectorRoute";
import { CountryRoute } from "./v1/modules/country/CountryRoute";
import { ClientTypeRoute } from "./v1/modules/clienttype/ClientTypeRoute";
import { PracticeRoute } from "./v1/modules/practices/practiceRoute";
import { FocusAreaRoute } from "./v1/modules/focusArea/FocusAreaRoute";
import { PracticeHeadRoute } from "./v1/modules/practiceHead/PracticeHeadRoute";
import { ServiceCategoryRoute } from "./v1/modules/serviceCategory/ServiceCategoryRoute";
import { ServiceLinesRoute } from "./v1/modules/serviceLine/ServiceLinesRoute";
import { GovernanceManagementRoute } from "./v1/modules/governanceManagement/GovernanceManagementRoute";
import { AccountManagerRoute } from "./v1/modules/accountManager/AccountManagerRoute";
import { BDMRoute } from "./v1/modules/bdm/BDMRoute";
import { GeographyRoute } from "./v1/modules/geography/GeographyRoute";
import { projectPriorityRoute } from "./v1/modules/projectPriority/ProjectPriorityRoute";
import { WorkOrderTypeRoute } from "./v1/modules/workOrderType/WorkOrderTypeRoute";
import { PriorityRoute } from "./v1/modules/priority/PriorityRoute";
import { SignificanceRoute } from "./v1/modules/significance/SignificanceRoute";
import { ProjectTypeRoute } from "./v1/modules/projecttype/projecttypeRoute";
import { ProjectStatusRoute } from "./v1/modules/projectstatus/projectstatusRoute";
import { ProjectRoute } from "./v1/modules/project/projectRoute"
import { IndustryRoute } from "./v1/modules/industry/IndustryRoute";
import { StateRoute } from "./v1/modules/state/StateRoute";
import { PocTypeRoute } from "./v1/modules/poctype/PocTypeRoute";
import { DomesticRoute } from "./v1/modules/domestic/DomesticRoute";
import { TaxRoute } from "./v1/modules/tax/TaxRoute";
import { CurrencyRoute } from "./v1/modules/currency/CurrencyRoute";
import { InvoiceGenerateFromRoute } from "./v1/modules/Invoicegeneratefrom/InvoiceGenerateFromRoute";
import { BankDetailRoute } from "./v1/modules/bankdetail/BankDetailRoute";
import { PaymentTermRoute } from "./v1/modules/paymentterms/PaymentTermRoute";
import { InvoiceSentByRoute } from "./v1/modules/invoicesentby/InvoicesentbyRoute";
import { InvoiceSentViaRoute } from "./v1/modules/invoicesentvia/InvoiceSentViaRoute";
import { PocClientRoute } from "./v1/modules/pocclient/pocClientRoute";
import { DocumentTypeRoute } from "./v1/modules/documenttype/DocumentRoute";
import { DocumentRoute } from "./v1/modules/document/DocumentRoute";
import { ClientGroupRoute } from "./v1/modules/clientgroup/ClientGroupRoute";
import { ClientRoute } from "./v1/modules/client/ClientRoute";
import { PocProjectRoute } from "./v1/modules/pocProject/pocProjectRoute";
import { ProjectMilestoneRoute } from "./v1/modules/paymentMilestone/paymentMilestoneRoute"


export class Routes {
  protected basePath: string;
  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "Hello !",
    });
  }

  public path() {
    const router = express.Router();
    router.use("/user", UserRoute);
    router.use("/module", ModuleRoute);
    router.use("/rights", RightsRoute);
    router.use("/role", RoleRoute);
    router.use("/menu", MenuRoute);
    router.use("/portals", PortalsRoute);
    router.use("/setting-type", SettingTypeRoute);
    router.use("/setting", SettingRoute);
    router.use("/language", LanguageRoute);
    router.use("/assign-project", AssignProjectRoute)
    router.use("/project-status", ProjectStatusRoute)
    router.use("/project-type", ProjectTypeRoute)
    router.use("/project-manager", ProjectManagerRoute)
    router.use("/project-lead", ProjectLeadRoute)
    router.use("/project-team-member", ProjectTeamMemberRoute)
    router.use("/time-zone", TimeZoneRoute)
    router.use("/resource-category", ResourceCategoryRoute)
    router.use("/resource-band", ResourceBandRoute)
    router.use("/milestone-percentage", MilestonePercentageRoute)
    router.use("/resource-name", ResourceNameRoute)
    router.use("/day-of-month", DayOfMonthRoute)
    router.use("/project-status-frequency", ProjectStatusFrequencyRoute)
    router.use("/project-call-frequency", ProjectReviewCallFrequencyRoute)
    router.use("/milestone", AddUpadateMilestoneRoute)
    router.use("/company",CompanyRoute)
    router.use("/company", CompanyRoute)
    router.use("/projectstatus", ProjectStatusRoute)
    router.use("/currency", CurrencyRoute)
    router.use("/poctype", PocTypeRoute)
    router.use("/sector", SectorRoute);
    router.use("/country", CountryRoute);
    router.use("/client-type", ClientTypeRoute);
    router.use("/practice", PracticeRoute);
    router.use("/focusarea", FocusAreaRoute);
    router.use("/practicehead", PracticeHeadRoute);
    router.use("/service-category", ServiceCategoryRoute);
    router.use("/service-lines", ServiceLinesRoute);
    router.use("/governance-management", GovernanceManagementRoute);
    router.use("/account-manager", AccountManagerRoute);
    router.use("/bdm", BDMRoute);
    router.use("/geography", GeographyRoute);
    router.use("/project-priority", projectPriorityRoute);
    router.use("/work-order-type", WorkOrderTypeRoute);
    router.use("/priority", PriorityRoute);
    router.use("/significance", SignificanceRoute);
    router.use("/industry", IndustryRoute);
    router.use("/state", StateRoute);
    router.use("/poctype", PocTypeRoute);
    router.use("/domestic", DomesticRoute);
    router.use("/tax", TaxRoute);
    router.use("/currency", CurrencyRoute);
    router.use("/invoice-generate-from", InvoiceGenerateFromRoute);
    router.use("/bank-detail", BankDetailRoute);
    router.use("/paymentterm", PaymentTermRoute);
    router.use("/invoicesentby", InvoiceSentByRoute);
    router.use("/invoicesentvia", InvoiceSentViaRoute);
    router.use("/documenttype", DocumentTypeRoute);
    router.use("/poc", PocClientRoute);
    router.use("/document", DocumentRoute);
    router.use("/clientgroup", ClientGroupRoute);
    router.use("/client", ClientRoute);
    router.use("/project", ProjectRoute)
    router.use("/industry", IndustryRoute);
    router.use("/state", StateRoute);
    router.use("/poctype", PocTypeRoute);
    router.use("/currency", CurrencyRoute);
    router.use("/poc", PocClientRoute);
    router.use("/document", DocumentRoute);
    router.use("/pocproject", PocProjectRoute);
    router.use('/paymentmilestone', ProjectMilestoneRoute)
    router.all("/*", (req, res) => {
      return res.status(404).json({ error: l10n.t("ERR_URL_NOT_FOUND") });
    });
    return router;
  }
}
