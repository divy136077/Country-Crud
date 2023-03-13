import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { CKEditorComponent } from 'ngx-ckeditor';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  usercount: any;
  rolecount: any;
  rightscount: any;
  modulecount: any;
  menucount: any;
  portalcount: any;
  

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
     this.getcount();
  }

  getcount() {
    this.commonService.getUserCount().subscribe(response => {
      this.usercount = response.result[0].User;
      this.rolecount = response.result[0].Roles;
      this.rightscount = response.result[0].Rights;
      this.modulecount = response.result[0].Module;
      this.menucount = response.result[0].Menu; 
      this.portalcount = response.result[0].Portal;
      console.log(36,this.usercount);
            
    });
  }

}
