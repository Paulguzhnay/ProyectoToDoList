import { Component, OnInit, TemplateRef } from '@angular/core';
import { Todo } from '../../models/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todoValue: string = '';
  todoList: Todo[] = [];
  finishedList: Todo[] = [];

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.authService.getTodos().subscribe(
      todos => {
        this.todoList = todos.filter(todo => !todo.isFinished);
        this.finishedList = todos.filter(todo => todo.isFinished);
      },
      error => {
        console.error('Error al cargar las tareas', error);
      }
    );
  }

  addTodo(): void {
    const newTodo: Todo = { title: this.todoValue, isFinished: false };
    this.authService.createTodo(newTodo).subscribe(
      todo => {
        this.todoList.push(todo);
        this.todoValue = '';
      },
      error => {
        console.error('Error al crear la tarea', error);
      }
    );
  }

  changeTodo(i: number): void {
    const todo = this.todoList[i];
    todo.isFinished = true;
    if (todo.id) {
      this.authService.updateTodoById(todo.id, todo).subscribe(
        updatedTodo => {
          this.todoList.splice(i, 1);
          this.finishedList.push(updatedTodo);
        },
        error => {
          console.error('Error al actualizar la tarea', error);
        }
      );
    } else {
      console.error('ID de la tarea no está definido');
    }
  }

  changeFinished(i: number): void {
    const todo = this.finishedList[i];
    todo.isFinished = false;
    if (todo.id) {
      this.authService.updateTodoById(todo.id, todo).subscribe(
        updatedTodo => {
          this.finishedList.splice(i, 1);
          this.todoList.push(updatedTodo);
        },
        error => {
          console.error('Error al actualizar la tarea', error);
        }
      );
    } else {
      console.error('ID de la tarea no está definido');
    }
  }

  openModal(content: TemplateRef<Element>, i: number, type: string): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        if (type === 'todoList') {
          this.deleteTodo(i, 'todoList');
        } else {
          this.deleteTodo(i, 'finishedList');
        }
      },
      reason => {}
    );
  }

  deleteTodo(i: number, listType: string): void {
    const todo = listType === 'todoList' ? this.todoList[i] : this.finishedList[i];
    if (todo.id) {
      this.authService.deleteTodoById(todo.id).subscribe(
        () => {
          if (listType === 'todoList') {
            this.todoList.splice(i, 1);
          } else {
            this.finishedList.splice(i, 1);
          }
        },
        error => {
          console.error('Error al eliminar la tarea', error);
        }
      );
    } else {
      console.error('ID de la tarea no está definido');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }
}
