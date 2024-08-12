import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  login(email: string, password: string): boolean {
    // Lógica de autenticación simulada
    if (email === 'user@example.com' && password === 'password123') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
