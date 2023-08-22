import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './../service/storage.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

   isAdminLoggedIn!:Boolean;
   isSalarieLoggedIn!:Boolean;

   constructor(private router:Router,
    private storageService:StorageService){}
   ngOnInit(){
     this.updateUserLoggedStatus();
     this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd ){
        this.updateUserLoggedStatus();
      }
     })
   }
   private updateUserLoggedStatus():void {
     this.isAdminLoggedIn = this.storageService.isAdminLoggedIn(); 
     this.isSalarieLoggedIn = this.storageService.isSalarieLoggedIn();

   }
   logout() {
    this.storageService.logout();
    this.router.navigateByUrl("/login");
  }

}
