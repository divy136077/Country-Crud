import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { ExportListComponent } from './components/export-list/export-list.component';
import { ListingComponent } from './components/listing/listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core';
import { AddItemBtnComponent } from './components/add-item-btn/add-item-btn.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [ExportListComponent, ListingComponent, AddItemBtnComponent],
  imports: [
    NgbNavModule,
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    InlineSVGModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    TranslationModule,
    CoreModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [ExportListComponent, ListingComponent, AddItemBtnComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CRUDTableModule { }
