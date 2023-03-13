import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(array: Array<any>, args?: any): any {
    return _.sortBy(array, [args]);
}

}
