import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../enviroments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private userID: string | null = null;
  private token: string | null = null;

  private registerUrl = `${environment.apiBaseUrl}/auth/register`;
  private loginUrl = `${environment.apiBaseUrl}/auth/login`;
  private todoUrl = `${environment.apiBaseUrl}/task`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap((response) => {
        if (response && response.token && response.user.id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          this.token = response.token;
          this.userID = response.user.id;
          this._isLoggedIn = true;
        } else {
          console.error('No token or userID found in response');
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn = false;
    this.token = null;
    this.userID = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn;
  }

  setTokenAndUserID(token: string, userID: string): void {
    this.token = token;
    this.userID = userID;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userID);
    this._isLoggedIn = true;
  }

  getUserID(): string | null {
    return this.userID;
  }

  getToken(): string | null {
    return this.token;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido si estás enviando datos JSON
    });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.registerUrl}`, userData);
  }

  createTodo(todoData: any): Observable<any> {
    console.log('todo', todoData);
    return this.http.post<any>(this.todoUrl, todoData, {
      headers: this.getAuthHeaders(),
    });
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTodos(userID: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.todoUrl}?userID=${userID}`;
    console.log('Request URL:', url);
    return this.http.get<any[]>(url, { headers });
  }

  updateTodoById(id: string, todo: Todo): Observable<any> {
    console.log(todo);
    return this.http.put(`${this.todoUrl}/${id}`, todo);
  }

  // Método para eliminar tarea
  deleteTodoById(id: string, userID: string): Observable<any> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete(url, {
      body: { userID: userID },
    });
  }
}
