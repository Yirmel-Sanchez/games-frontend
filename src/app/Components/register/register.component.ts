import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { ErrorService } from 'src/app/Services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private _errorService: ErrorService, private _usersService: UsersService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords }
    );
  }

  get formControls() {
    return this.registerForm.controls;
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registrarse();
    } else {
      if (this.registerForm.get('name')?.invalid) {
        this._errorService.setError('El nombre es requerido');
      } else if (this.registerForm.get('email')?.invalid) {
        this._errorService.setError('El correo electrónico es inválido');
      } else if (this.registerForm.get('password')?.invalid) {
        this._errorService.setError('La contraseña debe tener al menos 8 caracteres');
      } else if (this.registerForm.get('confirmPassword')?.invalid) {
        this._errorService.setError('La confirmación de la contraseña es requerida');
      } else if (this.registerForm.errors !== null && this.registerForm.errors['notSame']) {
        this._errorService.setError('Las contraseñas no coinciden');
      }
    }
  }

  registrarse(): void {
    let data = { 
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      pwd1: this.registerForm.get('password')?.value,
      pwd2: this.registerForm.get('confirmPassword')?.value
    };

    this._usersService.register(data).subscribe(
      (data) => {
        // Manejar la respuesta exitosa
        console.log('Respuesta exitosa:', data);
        this._errorService.setSuccess('Usuario registrado exitosamente. Recibirás las instrucciones de activación de la cuenta en tu correo electrónico');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Respuesta fallida:', error);
        if (error.status === 406) {
          this._errorService.setError(error.message);
        } else {
          this._errorService.setError("Ha ocurrido un error al intentar registrar el usuario");
        }
      }
    );
  }
}
