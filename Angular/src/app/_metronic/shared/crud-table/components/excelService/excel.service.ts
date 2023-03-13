import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  async generateExcel(ExcelData) {
    // Excel Title, Header, Data
    const ExcelDataArr = [];
    const ExcelDataFillArr = [];
   
    // Create workbook and worksheet
      const workbook = new Workbook();
      let  worksheetName = '';

    for (let i=0; i < ExcelData.length; i++) {
      if (ExcelData[i]) {
        for(let j=0; j < ExcelData[i].length; j++) {
          if (ExcelData[i][j].cell) {
            if (ExcelData[i][j].cell.indexOf('A') > -1) {
              if (i == 0) {
                worksheetName = ExcelData[i][j].value;
              }
              ExcelDataArr.push(Array(ExcelData[i][j].value)); 
              ExcelDataFillArr.push(ExcelData[i][j].settings); 
            }
          }
        }
      }
    }

    const worksheet = workbook.addWorksheet(worksheetName);

    for (let i=0; i < ExcelDataArr.length; i++) {
      let row = worksheet.addRow(ExcelDataArr[i]);
      
      let fileter = ExcelDataFillArr[i];
      let font_color = fileter.font_color.replace('#', '');
      let fill_color = fileter.fill_color.replace('#', '');
      let qty = row.getCell(1);

      qty.font = {
        name: fileter.font_name,
        size: fileter.font_size,
        bold: fileter.font_bold,
        color: { argb: font_color }
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: fill_color },
      };

    }

    worksheet.getColumn(1).width = 30;

    // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((ExcelDataArr: any) => {
        const blob = new Blob([ExcelDataArr], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, worksheetName+'.xlsx');
      });

  }
}
