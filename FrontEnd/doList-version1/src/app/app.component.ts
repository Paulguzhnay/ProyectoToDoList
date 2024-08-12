import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public appPages=[
    { title: 'Do List', url: '/login',},  
    { title: 'Do List Menu', url: '/DoList',},  
  ]
  
}

