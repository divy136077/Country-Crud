import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import jwt_decode from "jwt-decode";
import { Console } from "console";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl = environment.baseURL;
  constructor(public http: HttpClient) { }

  getBackendMenu(moduleNameServiceRoute, searchObj?) {
    //   this.getBaseURL(moduleNameServiceRoute);
    //   // if (searchObj) {
    //   return this.http
    //     .post(this.baseUrl + moduleNameServiceRoute + "/menu-list", searchObj, {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'authorization': 'Bearer ' + localStorage.getItem('authToken')
    //       })
    //     })
    //     .pipe(
    //       map((response: any) => {
    //         return response;
    //       }),
    //       catchError((err) => {
    //         return null;
    //       })
    //     );
    // this.getBaseURL(moduleNameServiceRoute);
    // if (searchObj) {
    return this.http
      .post(this.baseUrl + moduleNameServiceRoute + "/menu-list", searchObj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('authToken')
        })
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return null;
        })
      );
  }

  createClient(resource) {
    return this.http.post(this.baseUrl + "user/clients/create", resource).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return null;
      })
    );
  }

  updateClient(resource, id) {
    return this.http
      .put(this.baseUrl + "user/clients/update/" + id, resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return null;
        })
      );
  }

  createAssign(resource): Observable<any> {
    // this.getBaseURL(moduleNameServiceRoute);

    return this.http
      .post(this.baseUrl + "assign-project/create", resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  createMilestone(resource): Observable<any> {
    // this.getBaseURL(moduleNameServiceRoute);

    return this.http
      .post(this.baseUrl + "milestone/create", resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }


  getAllCategories() {
    return this.http.post(this.baseUrl + "category", {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getClienttypeListbyclientId(id) {
    return this.http
      .get(this.baseUrl + "userclient/getclientDetails/" + id)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  createCategorie(resource) {
    return this.http.post(this.baseUrl + "category/create", resource).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return null;
      })
    );
  }
  createBuckets(resource) {
    return this.http.post(this.baseUrl + "buckets", resource).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return null;
      })
    );
  }
  getcategoryById(id) {
    return this.http.get(this.baseUrl + "category/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getLabels() {
    return this.http.get(this.baseUrl + "template/label");
  }


  createNewClientGroup(data: any) {
    return this.http
      .post(this.baseUrl + "client/addclient", data)
      .pipe(
        map((response: any) => {
          return response;
        }
        ),
      )
  }
  getCompanyGroupDetails(id: any) {
    return this.http.get(this.baseUrl + "clientgroup/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getPriority() {
    return this.http.get(this.baseUrl + "priority/getallpriority").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getSignificance() {
    return this.http.get(this.baseUrl + "significance/getallsignificance").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getGovernanceManagement() {
    return this.http.get(this.baseUrl + "governance-management/getallgovernancemanagement").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getAccountManager() {
    return this.http.get(this.baseUrl + "account-manager/getallaccountmanager").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getBDM() {
    return this.http.get(this.baseUrl + "bdm/getallbdm").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getSector() {
    return this.http.get(this.baseUrl + "sector/getallsector").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getclientType() {
    return this.http.get(this.baseUrl + "client-type/getallclienttype").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getTypeOfPoc() {
    return this.http.get(this.baseUrl + "poctype/getallpoctype").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getTaxNumber() {
    return this.http.get(this.baseUrl + "tax/getalltax").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getBillingCurrency() {
    return this.http.get(this.baseUrl + "currency/getallcurrency").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getInvoiceGenerateFrom() {
    return this.http.get(this.baseUrl + "invoice-generate-from/getallinvoice-generate-from").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getDocumentType() {
    return this.http.get(this.baseUrl + "documenttype/getalldocumenttype").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getPoCName() {
    // this.getBaseURL(moduleNameServiceRoute);

    // console.log('url',this.baseUrl + moduleNameServiceRoute + "/getallpoctype")
    return this.http
      .get(environment.baseAuthURL + "pocproject/pocname").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );

  }

  getFocusAreaList() {
    return this.http
      .get(environment.baseURL + "focusarea/getallfocusarea").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  getServiceCategoriesList() {
    return this.http
      .get(environment.baseURL + "service-category/getallservicecategory").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  getServiceLineList() {
    return this.http
      .get(environment.baseURL + "service-lines/getallservicelines").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  getProjectStatus() {
    return this.http
      .get(environment.baseURL + "projectstatus/getallStatus").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }
  getProjectType() {
    return this.http
      .get(environment.baseURL + "projecttype/getallType").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }
  getProjectPriority() {
    return this.http
      .get(environment.baseURL + "project-priority/getallprojectpriority").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }
  getPracticeHead() {
    return this.http
      .get(environment.baseURL + "practicehead/getallpracticehead").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  getProjectPractice() {
    return this.http
      .get(environment.baseURL + "practice/getallpractice").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  getCurrency() {
    return this.http
      .get(environment.baseURL + "currency/getallcurrency").pipe(map((response: any) => {
        return response;
      }),
        catchError((err) => {
          return null;
        })
      );
  }

  createProject(resource) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    console.log(resource)
    return this.http.post(environment.baseURL + "project/create", resource, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return null;
      })
    );
  }

  createPocProject(resource): Observable<any> {
    return this.http
      .post(environment.baseURL + "pocproject/create", resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  getPocProject() {
    return this.http.get(environment.baseURL + "pocproject/").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  deletePocProject(id: any) {
    return this.http.delete(environment.baseURL + "pocproject/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  updatePocProject(id: any, data) {
    console.log("id= ", id)
    return this.http.put(environment.baseURL + "pocproject/update/" + id, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  toggelPocProject(data: any) {
    return this.http.put(environment.baseURL + "pocproject/toggle-status", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }
  createPaymentMilestoneProject(resource) {
    return this.http
      .post(environment.baseURL + "paymentmilestone/create", resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }


  getPaymentMilestoneName() {
    return this.http.get(environment.baseAuthURL + "paymentmilestone/").pipe(map((response: any) => {
      return response;
    }),
      catchError((err) => {
        return null;
      })
    );
  }
  updatePaymentMilestoneProject(id: any, data: any) {
    return this.http.put(environment.baseURL + "paymentmilestone/update/" + id, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  deletePaymentMilestone(id) {
    return this.http.delete(environment.baseURL + "paymentmilestone/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }
  getOverseas() {
    return this.http.get(this.baseUrl + "domestic/getalldomestic").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    )
  }

  getAllClientGroup() {
    return this.http
      .get(this.baseUrl + "/client/").pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  getCountry() {
    return this.http.get(this.baseUrl + "country/getallcountry").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getState(id) {
    return this.http.get(this.baseUrl + "state/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getIndustry() {
    return this.http.get(this.baseUrl + "industry/getallindustry").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  toggelPaymentMilestone(data: any) {
    console.log(data)
    return this.http.put(environment.baseURL + "paymentmilestone/toggle-status", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllProjectType() {
    return this.http.get(this.baseUrl + "project-type/getallType").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }

  getAllProjectLead() {
    return this.http.get(this.baseUrl + "project-lead/getAllLead").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getCompanyList(id) {
    return this.http.get(environment.baseURL + "company/getcompany/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllProjectTeamMember() {
    return this.http.get(this.baseUrl + "project-team-member/getAllTeamMember").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }

  getAllTimeZone() {
    return this.http.get(this.baseUrl + "time-zone/getAllTimeZone").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }

  getAllProjectStatusFrequency() {
    return this.http.get(this.baseUrl + "project-status-frequency/getAllProjectStatusFrequency").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getPayment() {
    return this.http.get(this.baseUrl + "paymentterm/getallpaymentterm").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllDayOfMonth() {
    return this.http.get(this.baseUrl + "day-of-month/getAllDayOfMonth").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getInvoiceSentBy() {
    return this.http.get(this.baseUrl + "invoicesentby/getallinvoicesentby").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllProjectCallFrequency() {
    return this.http.get(this.baseUrl + "project-call-frequency/getAllCallFrequency").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getInvoiceSentVia() {
    return this.http.get(this.baseUrl + "invoicesentvia/getallinvoicesentvia").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllMilestonePercentage() {
    return this.http.get(this.baseUrl + "milestone-percentage/getAllMilestonePercentage").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getBankdetails() {
    return this.http.get(this.baseUrl + "bank-detail/getallbank-detail").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  createPoc(resource): Observable<any> {
    return this.http
      .post(this.baseUrl + "poc/", resource)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          return null;
          return err;
        })
      );
  }
  getPoc(id: any) {
    return this.http.get(this.baseUrl + "poc/getall/" + id).pipe(
      map((response: any) => {
        return response;
        console.log(response, 'one');

      }),
      catchError((err) => {
        return err;
      })
    );
  }
  getOnePoc(id: any) {
    return this.http.get(this.baseUrl + "poc/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  deletePoc(id: any) {
    return this.http.delete(this.baseUrl + "poc/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  toggelPoc(data: any) {
    return this.http.post(this.baseUrl + "poc/toggle-status/", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
  updatePoc(id, resource) {
    return this.http
      .put(this.baseUrl + "poc/" + id, resource)
      .pipe(
        map((response: any) => {
          console.log(response, "response")
          return response;
        }),
        catchError((err) => {
          return err;
        })
      );
  }


  createDocument(resource: any): Observable<any> {
    return this.http.post(this.baseUrl + "document/create", resource)
    // .pipe(
    //   map((response: any) => {
    //     return response;
    //   }),
    //   catchError((err) => {
    //     return err;
    //   })
    // );

  }

  getDocument() {
    return this.http.get(this.baseUrl + "document/").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  updateData(id: any, data: any) {
    // console.log(id, 'uujj');

    return this.http.put(this.baseUrl + "milestone/" + id, data, {}).pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getAllProjectManager() {
    return this.http.get(this.baseUrl + "project-manager/getAllManager").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }

  // getAllProjectLead() {
  //     map((response: any) => {
  //       return response;
  //     }
  //     ),
  //   )}
  // getAllProjectTeamMember() {
  //   return this.http.get(this.baseUrl + "project-team-member/getAllTeamMember").pipe(
  //     map((response: any) => {
  //       return response;
  //     }
  //     ),
  //   )}

  toggelStatus(data: any) {
    return this.http.post(this.baseUrl + "milestone/toggle-status/", data).pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }
  getOneDoc(id: any) {
    return this.http.get(this.baseUrl + "document/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllResourceCategory() {
    return this.http.get(this.baseUrl + "resource-category/getAllResourceCategory").pipe(
      map((response: any) => {
        return response;
      }
      ),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllResourceName() {
    return this.http.get(this.baseUrl + "resource-name/getAllResourceName").pipe(
      map((response: any) => {
        return response;
      }
      ),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllResourceBand() {
    return this.http.get(this.baseUrl + "resource-band/getAllResourceBand").pipe(
      map((response: any) => {
        return response;
      }
      ),
      catchError((err) => {
        return err;
      })
    );
  }

  getAllMilestoneData() {
    return this.http.get(this.baseUrl + "milestone/getAllMilestone").pipe(
      map((response: any) => {
        return response;
      }
      ),
      catchError((err) => {
        return err;
      })
    );
  }
  deleteMilestoneUser(Id: any) {
    return this.http.delete(this.baseUrl + "milestone/" + Id, {}).pipe(
      map((response: any) => {
        return response;
      }
      ),
      catchError((err) => {
        return err;
      })
    );
  }

  deleteDoc(id: any) {
    return this.http.delete(this.baseUrl + "document/" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  getOneData(id: any) {
    return this.http.get(this.baseUrl + "milestone/" + id, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return null;
      })
    );
  }

  getAllStatus() {
    return this.http.get(this.baseUrl + "project-status/getallStatus").pipe(
      map((response: any) => {
        return response;
      }
      ),
    )
  }

  // updateData(id: any,data: any) {
  //   console.log(id,'uujj');

  // getCompanyById(id) {
  //   console.log('id')
  //   return this.http.get(environment.baseURL + "/company/" + id).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError((err) => {
  //       return null;
  //       return err;
  //     })
  //   );
  // }


}
