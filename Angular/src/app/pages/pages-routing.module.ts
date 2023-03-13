import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../modules/auth/_services/auth.guard";
import { ModuleGuard } from "../modules/auth/_services/module.guard";
import { LayoutComponent } from "./_layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "admin",
        loadChildren: () =>
          import("./admin-dashboard/admin-dashboard.module").then(
            (m) => m.AdminDashboardModule
          ),
      },
      {
        path: "user",
        loadChildren: () =>
          import("../modules/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "menu",
        loadChildren: () =>
          import("../modules/menu/menu.module").then((m) => m.MenuModule),
      },   
      {
        path: "client",
        loadChildren: () =>
          import("../modules/client/client.module").then(
            (m) => m.clientModule
          ),
      },
      {
        path: "project",
        loadChildren: () =>
          import("../modules/project/project.module").then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: "assign-project",
        loadChildren: () =>
          import("../modules/assign-project/assign-project.module").then(
            (m) => m.AssignProjectModule
          ),
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("../modules/user-profile/user-profile.module").then((m) => m.UserProfileModule),
      },
      {
        path: "",
        redirectTo: "/client",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "error/404",
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
