import { Component, OnInit, TemplateRef } from '@angular/core';
import { Todo } from '../../models/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todoValue: string = '';
  todoDescription: string = '';
  isFinished: boolean = false; // Nuevo estado para el checkbox
  userID: string | null = null;
  token: string | null = null;
  todoToDeleteId: string | null = null;
  todoList: Todo[] = [];
  finishedList: Todo[] = [];
  editingTodo: Todo | null = null;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
      this.token = params['token'];

      if (this.token && this.userID) {
        this.authService.setTokenAndUserID(this.token, this.userID);
        this.loadTodos();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  loadTodos(): void {
    if (this.userID) {
      this.authService.getTodos(this.userID).subscribe(
        todos => {
          this.todoList = todos.filter(todo => !todo.isFinished);
          this.finishedList = todos.filter(todo => todo.isFinished);
        },
        error => {
          console.error('Error al cargar las tareas', error);
        }
      );
    }
  }

  addTodo(): void {
    if (this.todoValue.trim() === '' || this.todoDescription.trim() === '' || !this.userID) {
      return;
    }

    const updatedTodo: Todo = {
      title: this.todoValue,
      description: this.todoDescription,
      userID: this.userID,
      isFinished: this.isFinished // Asigna el estado del checkbox
    };

    if (this.editingTodo) {
      // Si estamos editando una tarea existente
      this.authService.updateTodoById(this.editingTodo.id!, updatedTodo).subscribe(
        () => {
          this.loadTodos();
          this.clearInputs();
        },
        error => {
          console.error('Error al actualizar la tarea', error);
        }
      );
    } else {
      // Si estamos agregando una nueva tarea
      this.authService.createTodo(updatedTodo).subscribe(
        () => {
          this.loadTodos();
          this.clearInputs();
        },
        error => {
          console.error('Error al crear la tarea', error);
        }
      );
    }
  }

  editTodo(todo: Todo): void {
    this.todoValue = todo.title;
    this.todoDescription = todo.description;
    this.isFinished = todo.isFinished; // Configura el estado del checkbox
    this.editingTodo = todo;
  }

  deleteTodo(id: string): void {
    if (this.userID) {
      this.authService.deleteTodoById(id, this.userID).subscribe(
        () => {
          this.loadTodos();
        },
        error => {
          console.error('Error al eliminar la tarea', error);
        }
      );
    } else {
      console.error('No se puede eliminar la tarea, falta userID');
    }
  }

  clearInputs(): void {
    this.todoValue = '';
    this.todoDescription = '';
    this.isFinished = false; // Restablece el estado del checkbox
    this.editingTodo = null;
  }

  openModal(content: TemplateRef<Element>, todoId: string | undefined): void {
    if (todoId) {
      this.todoToDeleteId = todoId;
      this.modalService.open(content).result.then(
        result => {
          if (result === 'Ok click' && this.todoToDeleteId) {
            this.deleteTodo(this.todoToDeleteId);
          }
        },
        reason => {}
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmDelete(): void {
    if (this.todoToDeleteId && this.userID) {
      this.authService.deleteTodoById(this.todoToDeleteId, this.userID).subscribe(
        () => {
          this.loadTodos();
          this.modalService.dismissAll();
        },
        error => {
          console.error('Error al eliminar la tarea', error);
        }
      );
    }
  }
}
