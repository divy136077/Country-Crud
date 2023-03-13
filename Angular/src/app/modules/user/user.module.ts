import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { PartialsModule } from 'src/app/_metronic/partials/partials.module';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { InlineSVGModule } from 'ng-inline-svg';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../i18n/translation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/_metronic/core';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ModuleGuard } from '../auth/_services/module.guard';
import { AuthGuard } from '../auth/_services/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { MultiImportComponent } from './multi-import/multi-import.component';
import { MatExpansionModule } from '@angular/material/expansion';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { breadcrumb: 'PAGES.USER.USER' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
      },
      {
        path: '',
        component: UserListComponent,
        canActivate: [AuthGuard, ModuleGuard],
        data: { breadcrumb: null, 'moduleName': ['user', 'user/view'] },
      },
   
      {
        path: 'update',
        component: UserAddEditComponent,
        canActivate: [AuthGuard, ModuleGuard],
        data: { breadcrumb: 'PAGES.USER.UPDATE', 'moduleName': ['user', 'user/update'] },
      },
     
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { breadcrumb: 'PAGES.USER.PROFILE', 'moduleName': ['user', 'user/view'] },
      },
      {
        path: 'import',
        component: MultiImportComponent,
        data: { breadcrumb: 'PAGES.USER.USERIMPORT','moduleName': ['user', 'user/create']  },
      }
    ]
  }

];

@NgModule({
  declarations: [UserListComponent, UserAddEditComponent, UserComponent, UserProfileComponent, MultiImportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PartialsModule,
    MatCheckboxModule,
    InlineSVGModule,
    MatRadioModule,
    MatButtonModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    CoreModule,
    CRUDTableModule,
    MatAutocompleteModule,
    NgbNavModule,
    MatIconModule,
    MatExpansionModule,
    
  ]
})
export class UserModule { }
