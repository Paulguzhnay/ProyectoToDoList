import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../../models/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  todoValue:String='';

  todoList:Todo[]=[

    {    
      content: "Todo 1",
      value:false 
  },
  {    
    content: "Todo 2",
    value:false 
},
{    
  content: "Todo 3",
  value:false 
}

  ];

  finishedList:Todo[]=[]
  constructor(private modalService:NgbModal, private authService: AuthService, private router: Router){}

  changeTodo(i:number){
    const item = this.todoList.splice(i,1);
    console.log(item)
    this.finishedList.push(item[0])
  }

  addTodo(){
    this.todoList.push({content:this.todoValue, value:false});
    this.todoValue='';
  }

  changeFinished(i:number){
    const item= this.finishedList.splice(i,1);
    this.todoList.push(item[0])
  }

  openModal(content:TemplateRef<Element>,i:number, type:String ){
    this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'}).result.then(
      (result)=>{

        if (type=='todoList'){
          this.todoList.splice(i,1)
        }else{
          this.finishedList.splice(i,1)
        }

      },
      (reason)=>{

      }
    )

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }
}
