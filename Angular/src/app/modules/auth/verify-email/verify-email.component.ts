import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  token: any;
  moduleNameServiceRoute = API_ROUTES.USER;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.token = this.route.snapshot.params.token;
   }

  ngOnInit(): void {
    this.verifyEmail()
  }

  verifyEmail() {
    // this.commonService.verifyEmail(this.token, this.moduleNameServiceRoute).subscribe((data: any) => {
    //  if (data.status) {
    //     this.toastr.success(data.message, 'Success!');
    // } else {
    //   if (data.message) {
    //     this.toastr.error(data.message, 'Error!');
    //   }
    // }
    // });
  }

}
