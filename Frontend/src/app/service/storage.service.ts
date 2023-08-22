import { Injectable } from '@angular/core';

const USER = 'User';
const TOKEN = 'Token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  getUser(): any | null {
    const userString = localStorage.getItem(USER);
    return userString ? JSON.parse(userString) : null;
  }

  getUserRole(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.role;
  }

  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (token === null) {
      return false; 
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  isSalarieLoggedIn(): boolean {
    const token = this.getToken();
    if (token === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'SALARIE';
  }

  logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }  
}
