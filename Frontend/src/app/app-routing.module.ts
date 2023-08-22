import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DemandeComponent } from './demande/demande.component';
import { EnCoursComponent } from './en-cours/en-cours.component';
import { RefuserComponent } from './refuser/refuser.component';
import { TerminerComponent } from './terminer/terminer.component';
import { DemandeAdminComponent } from './demande-admin/demande-admin.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { HistoriqueComponent } from './historique/historique.component';
import { noAuthGuard } from './auth/guards/noAuth-guard/no-auth.guard';
import { ForgetComponent } from './forget/forget.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[noAuthGuard]},
  {path:'login',component:LoginComponent , canActivate:[noAuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'user',component:UserComponent},
  {path:'demande',component:DemandeComponent},
  {path:'en-cours',component:EnCoursComponent},
  {path:'refuser',component:RefuserComponent},
  {path:'terminer',component:TerminerComponent},
  {path:'demande-admin',component:DemandeAdminComponent},
  {path:'calendrier',component:CalendrierComponent},
  {path:'historique',component:HistoriqueComponent},
  {path:'forget',component:ForgetComponent},
  {path:'change',component:ChangePassComponent},
  {  path: 'notifications',component: NotificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
