import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'; // Para manejar errores

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).pipe(
        tap(response => {
          console.log('Login successful', response);

          // Verifica si `response` tiene los datos esperados antes de redirigir
          if (response && response.token) {
            this.authService.isAuthenticated(); // Usa el método para verificar la autenticación
            this.router.navigate(['/DoList']);
          } else {
            console.error('No token found in response');
          }
        }),
        catchError(error => {
          console.error('Login failed', error);
          return of(null); // Devuelve un observable vacío para manejar el error
        })
      ).subscribe();
    }
  }
}
