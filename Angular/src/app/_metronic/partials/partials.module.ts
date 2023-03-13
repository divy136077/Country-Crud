import { NgModule } from '@angular/core';

// Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
// Material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InlineSVGModule } from 'ng-inline-svg';

import { AddEmailDialogComponent } from './content/crud/add-email-dialog/add-email-dialog.component';
import { DeleteEntityDialogComponent } from './content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateStatusDialogComponent } from './content/crud/update-status-dialog/update-status-dialog.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddCategoryDialogComponent } from './content/crud/add-category-dialog/add-category-dialog.component';
import { TagInputModule } from 'ngx-chips';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { AddBucketDialogComponent } from './content/crud/add-bucket-dialog/add-bucket-dialog.component';
import { RegistrationConfirmationComponent } from './content/crud/registration-confirmation/registration-confirmation.component';
import { AddNewClientDialogComponent } from './content/crud/add-new-client-dialog/add-new-client-dialog.component';

@NgModule({
  declarations: [DeleteEntityDialogComponent, UpdateStatusDialogComponent, AddEmailDialogComponent,AddCategoryDialogComponent, AddBucketDialogComponent, RegistrationConfirmationComponent, AddNewClientDialogComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    InlineSVGModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
    MatSelectModule,
    MatInputModule,
    TagInputModule,
    MatOptionModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    DeleteEntityDialogComponent,
    UpdateStatusDialogComponent,
    AddEmailDialogComponent,
    RegistrationConfirmationComponent
  ],
  entryComponents: [
    DeleteEntityDialogComponent,
    UpdateStatusDialogComponent,
    RegistrationConfirmationComponent
  ]
})
export class PartialsModule { }
