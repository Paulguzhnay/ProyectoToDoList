import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      //confirmarContraseña: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
//    let confirmPass = group.controls['password2'].value;
//    return pass === confirmPass ? null : { notSame: true };
  }
  

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("data", this.registerForm.value)
      this.authService.registerUser(this.registerForm.value).subscribe(response=>{
 
        console.log('Registro exitoso',response);
        this.router.navigate(['/login']);  
      })
    
    } else {
      console.log('Error en el registro');
    }
  }
}
