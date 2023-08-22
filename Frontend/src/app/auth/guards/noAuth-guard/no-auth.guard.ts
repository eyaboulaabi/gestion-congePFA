import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
@Injectable({
  providedIn: "root"
})
export class noAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService // Inject StorageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.storageService.getToken(); // Utilize the injected service instance
    const userRole = this.storageService.getUserRole(); // Utilize the injected service instance
    console.log('Token:', token);
    console.log('UserRole:', userRole);

    if (this.storageService.hasToken() && this.storageService.isSalarieLoggedIn()) { // Utilize the injected service instance
      this.router.navigateByUrl("/home");
      return false;
    } 
    else if (this.storageService.hasToken() && this.storageService.isAdminLoggedIn()) { // Utilize the injected service instance
      this.router.navigateByUrl("/home");
      return false;
    }
    return true;
  }
}
