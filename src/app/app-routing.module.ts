import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminModule } from './Admin/admin.module';
import { CreatePageComponent } from './Admin/create-page/create-page.component';
import { DashboardPageComponent } from './Admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './Admin/edit-page/edit-page.component';
import { LoginPageComponent } from './Admin/login-page/login-page.component';
import { AdminLayoutComponent } from './Admin/shared/components/admin-layout/admin-layout.component';
import { AuthGuard } from './Admin/shared/services/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: HomePageComponent},
    {path: 'post/:id', component: PostPageComponent}
    ]
  },
  {path: 'admin', children:[
    {
      path: '', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
        {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
        {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
      ]
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
