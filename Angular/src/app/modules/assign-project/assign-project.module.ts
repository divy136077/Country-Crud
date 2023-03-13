import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AssignProjectAddEditComponent } from './assign-project-add-edit/assign-project-add-edit.component';
import { AssignProjectListComponent } from './assign-project-list/assign-project-list.component';
import { AssignProjectComponent } from './assign-project.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from 'src/app/_metronic/partials/partials.module';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { InlineSVGModule } from 'ng-inline-svg';

import { TranslationModule } from '../i18n/translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from 'src/app/_metronic/core';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { ModuleGuard } from '../auth/_services/module.guard';
import { AuthGuard } from '../auth/_services/auth.guard';


const routes : Routes = [
  {
    path: '',
    component : AssignProjectComponent,
    data: {},
    children: [
      {
        path : '',
        pathMatch : 'full',
        redirectTo : 'assign-project'
      },
      {
        path: 'view',
        component: AssignProjectListComponent,

        data: {breadcrumb : null, 'moduleName':['assign-project', 'assign-project/view']}
      },
      {
        path: 'add',
        component: AssignProjectAddEditComponent,

        data: { breadcrumb : 'PAGES.ASSIGNPROJECT.ADD', 'moduleName':['assign-project', 'assign-project/create']}
      },
      {
        path: 'update',
        component: AssignProjectAddEditComponent,

        data: {breadcrumb : 'PAGES.ASSIGNPROJECT.UPDATE', 'moduleName':['assign-project', 'assign-project/update']}
      }
    ]
  }
  
]

@NgModule({
  declarations: [AssignProjectAddEditComponent, AssignProjectListComponent, AssignProjectComponent],
  imports: [
    NgbNavModule,
    CommonModule,
    RouterModule.forChild(routes),
    PartialsModule,
    MatCheckboxModule,
    InlineSVGModule,
    MatRadioModule,
    MatButtonModule,
    MatDividerModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    CoreModule,
    CRUDTableModule,
    MatExpansionModule
  ]
})
export class AssignProjectModule { }
