import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  },
  { path: 'login', component: LoginComponent },
  {path: "DoList",component:TodolistComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
