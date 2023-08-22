import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalarieRoutingModule } from './salarie-routing.module';
import { DashboardComponent } from './salarie-components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SalarieRoutingModule
  ]
})
export class SalarieModule { }
