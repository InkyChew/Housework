import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekTasksComponent } from './week-tasks/week-tasks.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: '', component: WeekTasksComponent, pathMatch: 'full'},
  {path: 'report', component: ReportComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
