import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../gaurd/auth.guard";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserComponent } from "./user.component";



const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '',  component : UserListComponent , canActivate: [AuthGuard]},
            { path: 'add', loadChildren: () => import('./add-edit/add-edit.module').then(x => x.AddEditModule) },
            { path: 'edit/:id', loadChildren: () => import('./add-edit/add-edit.module').then(x => x.AddEditModule) , canActivate: [AuthGuard]},
        ]
    }
   
   
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes) , CommonModule]
})
export class UserRoutingModule { }