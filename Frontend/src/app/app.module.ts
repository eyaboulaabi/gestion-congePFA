import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DemandeComponent } from './demande/demande.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RefuserComponent } from './refuser/refuser.component';
import { EnCoursComponent } from './en-cours/en-cours.component';
import { TerminerComponent } from './terminer/terminer.component';
import { DemandeAdminComponent } from './demande-admin/demande-admin.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { HistoriqueComponent } from './historique/historique.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { SalarieRoutingModule } from './modules/salarie/salarie-routing.module';
import { ForgetComponent } from './forget/forget.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    UserComponent,
    DemandeComponent,
    RefuserComponent,
    EnCoursComponent,
    TerminerComponent,
    DemandeAdminComponent,
    CalendrierComponent,
    HistoriqueComponent,
    ForgetComponent,
    ChangePassComponent,
    NotificationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, 
    MatDialogModule,
    ModalModule,
    MatSlideToggleModule ,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AdminRoutingModule,
    SalarieRoutingModule ,
    ToastrModule.forRoot(),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
