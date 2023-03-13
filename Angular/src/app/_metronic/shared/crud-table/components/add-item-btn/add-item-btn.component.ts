import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AclService } from 'src/app/_metronic/core/services/acl.service';

@Component({
  selector: 'app-add-item-btn',
  templateUrl: './add-item-btn.component.html',
  styleUrls: ['./add-item-btn.component.scss']
})
export class AddItemBtnComponent implements OnInit {

  @Input() moduleUrl: string;
  @Input() title: string;
  @Input() moduleSlug: any;
  tokenData: any;
  routeData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private aclService: AclService,
  ) { }

  ngOnInit(): void {
    this.tokenData = this.aclService.getDecodedAccessToken();
    this.tokenData['permissions'] = this.tokenData.device_token.user_permission ? JSON.parse(this.tokenData.device_token.user_permission) : JSON.parse(this.tokenData.device_token.user_permissions);
    this.routeData = this.activatedRoute.snapshot.data;
  }

}
