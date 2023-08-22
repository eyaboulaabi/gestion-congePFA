import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './salarie-components/dashboard/dashboard.component';
import { SalarieGuard } from 'src/app/auth/guards/salarie-guard/salarie.guard';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  
  { path: "dashboard", component: DashboardComponent, canActivate: [SalarieGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalarieRoutingModule { }
