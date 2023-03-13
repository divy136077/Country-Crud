import { Component, Input, OnInit } from '@angular/core';
import { MODULES_NAME, USER_ENTITY } from 'src/app/constant/constant';
import { ExcelService } from 'src/app/_metronic/core/services/excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {

  @Input() listData: any;
  @Input() selectedEntity: string[];
  @Input() header: string[];
  @Input() reportTitle: string;
  @Input() fileName: string
  currentDate = moment(new Date()).format('YYYY-MM-DD');

  constructor(
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
  }


  /** Export data */
  async exportData() {
    let data = [];
    let fileData = new Promise<void>((resolve, reject) => {
      this.listData.forEach(async (element, index) => {
        let obj = [];
        this.selectedEntity.forEach(entity => {
          if (entity === 'status') {
            if (element[entity] == 1) {
              obj.push('Active')
            } else if (element[entity] == 2) {
              obj.push('Inactive')
            }
          } else {
            obj.push(element[entity]);
          }
          //obj.push(element[entity]);
        });
        data.push(obj);
        resolve();
      });
    });
    fileData.then(() => {
      const detail = {
        data: data,
        header: this.header,
        title: this.reportTitle,
      };
      this.excelService.excelExportFile(detail, this.fileName);
    });
  }

}
