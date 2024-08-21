import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  // Define las URLs para la API de registro y login
  private registerUrl = `http://localhost:3000/auth/register`;
  private loginUrl = `http://localhost:3000/auth/login`;

  // Define las URLs para la API de tareas (todos)
  private todoUrl = `http://localhost:3000/api/todo`;

  constructor(private http: HttpClient) { }

  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { correo: email, contraseña: password });
  }

  logout(): void {
    this.isLoggedIn = false;
    // Aquí podrías hacer una solicitud para cerrar sesión en el backend si es necesario
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Método para registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  // ----------------- Métodos para manejar "Todos" -----------------

  // Método para crear una nueva tarea
  createTodo(todoData: any): Observable<any> {
    return this.http.post<any>(this.todoUrl, todoData);
  }

  // Método para obtener una tarea por ID
  getTodoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}/${id}`);
  }

  // Método para listar todas las tareas
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.todoUrl);
  }

  // Método para actualizar una tarea por ID
  updateTodoById(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}/${id}`, updatedData);
  }

  // Método para eliminar una tarea por ID
  deleteTodoById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.todoUrl}/${id}`);
  }
}
