import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { ErrorService } from 'src/app/Services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private _errorService: ErrorService, private _usersService: UsersService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  acceder(): void {
    if (this.loginForm.valid) {
      this.peticionAcceder();
    } else {
      if (this.loginForm.get('username')?.invalid) {
        this._errorService.setError('El nombre de usuario es requerido');
      } else if (this.loginForm.get('password')?.invalid) {
        this._errorService.setError('La contraseña es requerida');
      }
    }
  }

  peticionAcceder() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this._usersService.login(username, password).subscribe(
      (data) => {
        console.log('Respuesta exitosa:', data);
        this._usersService.setUserData(data);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Respuesta fallida:', error);
        if(error.status === 401) {
          this._errorService.setError('Usuario o contraseña incorrectos');
        }else{
          this._errorService.setError('Error al intentar acceder');
        }
      });
  }
}
