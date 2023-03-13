import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ListValuePipe } from './pipes/list-value.pipe';
import { GetStatusValuePipe } from './pipes/get-status-value.pipe';
import { OrderPipe } from './pipes/order.pipe';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe, AutofocusDirective, ListValuePipe, GetStatusValuePipe, OrderPipe],
  imports: [CommonModule],
  exports: [FirstLetterPipe, SafePipe, AutofocusDirective, ListValuePipe, GetStatusValuePipe, OrderPipe],
})
export class CoreModule { }
