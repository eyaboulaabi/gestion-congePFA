import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
@Injectable({
  providedIn: "root"
})
export class SalarieGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService, // Inject StorageService
    private sanckbar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('SalarieGuard canActivate triggered');
    const token = this.storageService.getToken(); // Utilize the injected service instance
    const userRole = this.storageService.getUserRole(); // Utilize the injected service instance
    console.log('Token:', token);
    console.log('UserRole:', userRole);
    
    if (this.storageService.isAdminLoggedIn()) { // Utilize the injected service instance
      console.log('Admin is logged in'); // Log to indicate that the admin condition is true
      this.router.navigateByUrl("");
      this.sanckbar.open("You don't have access to this page", "Close", { duration: 5000 });
      return false;
    } else if (!this.storageService.hasToken()) { // Utilize the injected service instance
      console.log('No token found'); // Log to indicate that the token condition is false

      this.storageService.logout(); // Utilize the injected service instance
      this.router.navigateByUrl("/login");
      this.sanckbar.open("You are not loggedIn", "Close", { duration: 5000 });
      return false;
    }
    console.log('Access granted'); // Log to indicate that access is granted

    return true;
  }
}
