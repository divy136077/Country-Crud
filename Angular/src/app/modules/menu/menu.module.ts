import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from 'src/app/_metronic/partials/partials.module';

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
import { MenuAddEditComponent } from './menu-add-edit/menu-add-edit.component';
import { MenuComponent } from './menu.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ModuleGuard } from '../auth/_services/module.guard';
import { AuthGuard } from '../auth/_services/auth.guard';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    data: { breadcrumb: 'PAGES.MENU.MENU' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu'
      },
      {
        path: '',
        component: MenuListComponent,
        canActivate: [AuthGuard,ModuleGuard],
        data: { breadcrumb: null,'moduleName': ['menu', 'menu/view']  },
      },
      {
        path: 'add',
        component: MenuAddEditComponent,
        canActivate: [AuthGuard,ModuleGuard],
        data: { breadcrumb: 'PAGES.MENU.ADD','moduleName': ['menu', 'menu/create']  },
      },
      {
        path: 'update',
        component: MenuAddEditComponent,
        canActivate: [AuthGuard,ModuleGuard],
        data: { breadcrumb: 'PAGES.MENU.UPDATE','moduleName': ['menu', 'menu/update']  },
      }
    ]
  }
];

@NgModule({
  declarations: [MenuListComponent, MenuAddEditComponent, MenuComponent],
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
    MatOptionModule,
    MatSelectModule,
  ]
})

export class MenuModule { }
