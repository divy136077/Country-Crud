import { Pipe, PipeTransform } from '@angular/core';
import { USER_ENTITY } from 'src/app/constant/constant';
import { isArray, isObject } from 'util';

@Pipe({
  name: 'listValue'
})
export class ListValuePipe implements PipeTransform {


  transform(value, field): any {
    if (field) {
      const strArr = field.split('.');
      let data = value;
      const last = strArr.pop();
      if (strArr.length > 0) {
        if (strArr[0] == 'translations') {
          if (value[strArr[0]][0] && value[strArr[0]][0][last]) {
            data = value[strArr[0]][0][last];
          } else {
            data = '-';
          } 
        } else if (value[strArr[0]] !== null && typeof value[strArr[0]] === 'object') {
          data = value[strArr[0]][last];
        }
        return data;
      } else if (strArr[0] == 'translations') {
        if (value[strArr[0]][0] && value[strArr[0]][0][last]) {
          data = value[strArr[0]][0][last];
        } else {
          data = '-';
        } 
        return data;
      } else {
        if (value[field] !== null && value[field] !== undefined) {
          if (field === USER_ENTITY.PAYED) {
            data = value[field] === 0 ? 'No' : 'Yes';
          } else {
            data = value[field];
          }
        } else {
          data = '-';
        }
        return data;
      }
    } else {
      const strArr = value.split('.');
      if (strArr.length > 1) {
        return strArr[0];
      } else {
        if (value === 'dob') {
          return 'Birth Date';
        }
        return value;
      }
    }
  }

}
