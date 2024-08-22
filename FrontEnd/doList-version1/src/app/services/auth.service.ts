import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../enviroments/environment'; // Importa el archivo de entorno

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;

  // Usa las URLs desde las variables de entorno
  private registerUrl = `${environment.apiBaseUrl}/auth/register`;
  private loginUrl = `${environment.apiBaseUrl}/auth/login`;
  private todoUrl = `${environment.apiBaseUrl}/todo`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this._isLoggedIn = true;
        } else {
          console.error('No token found in response');
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn;
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  createTodo(todoData: any): Observable<any> {
    return this.http.post<any>(this.todoUrl, todoData);
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}/${id}`);
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.todoUrl);
  }

  updateTodoById(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}/${id}`, updatedData);
  }

  deleteTodoById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.todoUrl}/${id}`);
  }
}
