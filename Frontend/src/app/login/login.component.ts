import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor( 
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private storageService:StorageService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.service.login(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    ).subscribe(
      (response) => {
        console.log(response);
        if (this.storageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('home');
        } else if (this.storageService.isSalarieLoggedIn()) {
          this.router.navigateByUrl('home');
        }
      },
      (error: any) => {
        if (error.status == 406) {
          this.snackbar.open('User is not active', 'Close', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('Bad credentials', 'Close', {
            duration: 5000,
          });
        }
      }
    );
  }
}
