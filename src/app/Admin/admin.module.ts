import { CommonModule } from "@angular/common";
import { NgModule, Pipe } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SharedModule } from "../shared/shared.module";
import { SearchPipe } from "./shared/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    LoginPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
    ])
  ],
  exports: [RouterModule],
  providers: []
})

export class AdminModule {

}
