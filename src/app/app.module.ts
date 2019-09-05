import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { TasksComponent } from "./tasks/tasks.component";
import { WorkflowsComponent } from "./workflows/workflows.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    TasksComponent,
    WorkflowsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
