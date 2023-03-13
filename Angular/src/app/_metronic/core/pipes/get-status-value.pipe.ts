import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { MODULES_NAME } from 'src/app/constant/constant';

@Pipe({
  name: 'getStatusValue'
})
export class GetStatusValuePipe implements PipeTransform {
  currentDate = moment(new Date()).format('YYYY-MM-DD');

  transform(value, moduleName) {
    if (moduleName === MODULES_NAME.USER) {
      const validDate = moment(value.valid_until).format('YYYY-MM-DD');
      if (validDate >= this.currentDate) {
        const secondDate = moment(new Date(value.valid_until));
        const dayDiff = secondDate.diff(this.currentDate, 'day');
        return dayDiff <= 31 ? 'Expiring' : value.status === 1 ? 'Active' : 'Inactive';
      } else if (validDate < (this.currentDate)) {
        return 'Expired';
      } else {
        return value.status === 2 ? 'Maintenance' : value.status === 0 ? 'Inactive' : 'Active';
      }
    } else {
      return value.status === 2 ? 'Maintenance' : value.status === 0 ? 'Inactive' : 'Active';
    }

  }

}
