import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { MainComponent } from './main/main.component';
import { TasklistComponent } from './admin/tasklist/tasklist.component';
import { UsersComponent } from './admin/users/users.component';
import { HeaderComponent } from './header/header.component';
import { WorkflowsComponent } from './workflows/workflows.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminComponent, MainComponent, TasklistComponent, UsersComponent, HeaderComponent, WorkflowsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
