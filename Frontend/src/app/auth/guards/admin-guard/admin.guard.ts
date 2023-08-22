import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService, // Inject StorageService
    private sanckbar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.storageService.getToken(); // Utilize the injected service instance
    const userRole = this.storageService.getUserRole(); // Utilize the injected service instance
    console.log('Token:', token);
    console.log('UserRole:', userRole);
    
    if (this.storageService.isSalarieLoggedIn()) { // Utilize the injected service instance
      this.router.navigateByUrl("/home");
      this.sanckbar.open("You don't have access to this page", "Close", { duration: 5000 });
      return false;
    } 
    else if (!this.storageService.hasToken()) { // Utilize the injected service instance
      this.storageService.logout(); // Utilize the injected service instance
      this.router.navigateByUrl("/login");
      this.sanckbar.open("You are not loggedIn", "Close", { duration: 5000 });
      return false;
    }
    return true;
  }
}
