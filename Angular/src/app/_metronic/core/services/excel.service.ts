import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private toastr: ToastrService,
  ) { }

  exportData(details, excelFileName) {
    const header = details.header;
    const data = details.data;

    // Create a workbook with a worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(excelFileName);

    worksheet.addRow([]);

    // Adding Header Row
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.font = {
        bold: true,
        color: { argb: '000000' },
        size: 12
      };
    });

    data.forEach(d => {
      worksheet.addRow(d);
    });
    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, excelFileName + '_' + new Date().getTime() + '.xlsx');
      this.toastr.success('Data exported succesfully!', 'Success!');
    });

  }

  public totalTimePerUser(details, excelFileName: string): void {
    const title = details.mainTitle;
    const subTitle = details.title;
    const header = details.header;
    const data = details.data;

    // Create a workbook with a worksheet
    let workbook: ExcelProper.Workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(excelFileName);

    worksheet.addRow([]);
    // Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Calibri',
      bold: true,
    };

    worksheet.mergeCells(`A${titleRow.number}:D${titleRow.number}`);

    let subTitleRow = worksheet.addRow([subTitle]);
    subTitleRow.font = {
      name: 'Calibri',
      bold: true,
      color: { argb: '00FF0000' }
    };

    // Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.font = {
        bold: true,
        color: { argb: '000000' },
        size: 12
      };
    });

    data.forEach(d => {
       worksheet.addRow(d);
    });
    worksheet.addRow([]);

    let totalRow = worksheet.addRow([]);
    let totalCell = totalRow.getCell(7);
    totalCell.value = 'Total';
    totalCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };

    let ActHrsCell = totalRow.getCell(8);
    ActHrsCell.value = details.totalCount.totalActHrs;
    ActHrsCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    ActHrsCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };

    let RegHrsCell = totalRow.getCell(9);
    RegHrsCell.value = details.totalCount.totalRegHrs;
    RegHrsCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    RegHrsCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };

    let OtHrsCell = totalRow.getCell(10);
    OtHrsCell.value = details.totalCount.totalOtHrs;
    OtHrsCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    OtHrsCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };

    let DTHrsCell = totalRow.getCell(11);
    DTHrsCell.value = details.totalCount.totalDoubleTimeHrs;
    DTHrsCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    DTHrsCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };

    // Generate & Save Excel File
    this.saveAsExcelFile(workbook, excelFileName, worksheet);
  }

  async saveAsExcelFile(workbook, excelFileName, worksheet) {
    await workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, excelFileName + '_' + new Date().getTime() + '.xlsx');
      this.toastr.success('Report download succesfully!', 'Success!');
    });
    //  await this.toastr.success('Report download succesfully!', 'Success!');
  }
  public excelExportFile(details, excelFileName: string): void {
    const title = details.title;
    const subTitle = details.title;
    const header = details.header;
    const data = details.data;
 
    // Create a workbook with a worksheet
    const workbook = new Workbook();
    let worksheet = workbook.addWorksheet(excelFileName);
 
    // worksheet.addRow([]);
    // Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Calibri',
      bold: true,
    };
 
    worksheet.mergeCells(`A${titleRow.number}:D${titleRow.number}`);
 
    // Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.font = {
        bold: true,
        color: { argb: '000000' },
        size: 12
      };
    });
 
    data.forEach(d => {
      worksheet.addRow(d);
    });
    worksheet.addRow([]);
    // Generate & Save Excel File
    this.saveAsExcelFile(workbook, excelFileName, worksheet);
  }
}
