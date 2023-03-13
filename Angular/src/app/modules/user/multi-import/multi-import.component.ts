import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-import',
  templateUrl: './multi-import.component.html',
  styleUrls: ['./multi-import.component.scss']
})
export class MultiImportComponent implements OnInit {

  files: any;
  moduleNameServiceRoute: any = 'user';
  excelPath: any;
  csvPath: any;
  excelName: any;
  csvName: any;
  value: any;
  isShowMessage = false;
  title: any = '';
  dataLength: any;
  errorMessage: any;
  workbook: ExcelProper.Workbook;
  faildData: any;
  successData: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onFilesAdded(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].size < 5242880 &&
        (event.target.files[0].type === 'application/vnd.ms-excel' || event.target.files[0].type === 'text/csv' ||
          event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      ) {
        this.isShowMessage = false;
        this.files = event.target.files[0];
        let reader = new FileReader();
        reader.onload = async (e: any) => {
          if (this.files.name.split('.')[1] === 'csv') {
            const csvData = reader.result;
            const csvRecordsArray = (csvData as any).trim().split(/\r\n|\n/);
            this.dataLength = csvRecordsArray.length - 1;
          } else {
            this.workbook = new Excel.Workbook();
            const arryBuffer = await (this.files).arrayBuffer();
            await this.workbook.xlsx.load(arryBuffer);
            const worksheet = this.workbook.getWorksheet(1);
            this.dataLength = worksheet.rowCount - 1;
          }
          if (this.dataLength > 100) {
            this.errorMessage = `You can't add more than 100 record`;
          } else {
            this.errorMessage = '';
          }
          this.cdr.detectChanges();
        };
        reader.readAsText(this.files);
      } else {
        this.isShowMessage = true;
        this.toastr.error('You have uploaded an invalid file type or Maximum upload file size: 5 MB!', 'Error!');
      }
    }
  }

  /**
   * Form Submit
   */
  addHoursEntry() {
    if (!this.files) {
      this.isShowMessage = true;
      return;
    }
    if (this.errorMessage) {
      return;
    }
    let formData = new FormData();

    if (this.files) {
      this.isShowMessage = false;
      formData.append('file', this.files);
    }
    this.commonService.bulkimport(formData, this.moduleNameServiceRoute).subscribe((res) => {
      if (res.status) {
        this.router.navigate(['user']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  closeResponse() {
    this.faildData = null;
  }
}
