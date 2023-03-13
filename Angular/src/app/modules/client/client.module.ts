import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { clientListComponent } from './client-list/client-list.component';
import { clientAddEditComponent } from './client-add-edit/client-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { clientComponent } from './client.component';
import { PartialsModule } from 'src/app/_metronic/partials/partials.module';
import { MatExpansionModule } from '@angular/material/expansion';

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



const routes: Routes = [
  {
    path: '',
    component: clientComponent,
    data: { breadcrumb: 'PAGES.CLIENT.CLIENT' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client'
      },
      {
        path: '',
        component: clientListComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: null, 'moduleName': ['client', 'client/view'] },
      },
      {
        path: 'add',
        component: clientAddEditComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: 'PAGES.CLIENT.ADD', 'moduleName': ['client', 'client/create'] },
      },
      {
        path: 'update',
        component: clientAddEditComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: 'PAGES.CLIENT.UPDATE', 'moduleName': ['client', 'client/update'] },
      }
       
    ]
  }

];

@NgModule({
  declarations: [clientListComponent, clientAddEditComponent, clientComponent],
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
export class clientModule { }
