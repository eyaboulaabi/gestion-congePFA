import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/auth/guards/admin-guard/admin.guard';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent , canActivate:[AdminGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
