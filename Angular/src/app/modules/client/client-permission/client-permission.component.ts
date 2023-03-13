import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { moduleList } from 'src/app/constant/constant';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-permission',
  templateUrl: './client-permission.component.html',
  styleUrls: ['./client-permission.component.scss']
})
export class RolePermissionComponent implements OnInit, OnChanges {

  @Output() permissionEvent = new EventEmitter<string>();
  @Input() rolePermissions: any;
  @Input() resetData: any;
  moduleList: any = moduleList;

  activeLangId = 'en';

  imagePath : any = environment.imageURL;
  templateList: any ;
  selectedPermissions: any = [];
  constructor(
    private commonService: CommonService,
    public translateService: TranslateService,
  ) {
    this.getAllTemplateType();
  }

  ngOnInit(): void {
    this.getLanguage();
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line: forin
    for (const propName in changes) {
      // only run when property 'data' changed
      if (propName === 'rolePermissions') {
        //  this line will update posts values
        this.rolePermissions = changes[propName].currentValue;
        if (this.rolePermissions) {
          this.selectedPermissions = this.rolePermissions;
          this.permissionEvent.emit(this.selectedPermissions);
        }
      } else if (propName === 'resetData') {
        this.selectedPermissions = [];
        this.permissionEvent.emit(this.selectedPermissions);
      }
    }
  }

  /** Select permission */
  selectModule(moduleSlug) {
    const index = this.selectedPermissions.indexOf(moduleSlug);
    if (index !== -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(moduleSlug);
    }
    this.permissionEvent.emit(this.selectedPermissions);
  }


 /**
   * get all template type list
   */
  getAllTemplateType() {
    this.commonService.getAlltemplateTypeList('templatetype', this.activeLangId).subscribe(response => {
      this.templateList = response.items;
    });
  }


  languageList: any = [];

  getLanguage() {
    this.languageList = this.commonService.getLanguage();

  }

  public aftertabChange($event: NgbNavChangeEvent) {
    this.activeLangId = $event.nextId;
    this.translateService.setDefaultLang(this.activeLangId);
    this.getAllTemplateType();
  }


}
