import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TasklistComponent } from './admin/tasklist/tasklist.component';
import { UsersComponent } from './admin/users/users.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'tasks', component: TasklistComponent },
  { path: 'tasks/detail/:id', component: TaskDetailComponent },
  { path: 'users', component: UsersComponent },
  { path: 'workflows', component: WorkflowsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
