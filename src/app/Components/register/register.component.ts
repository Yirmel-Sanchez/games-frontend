import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  user: string = '';
  pass1: string = '';
  pass2: string = '';

  constructor(private router: Router) { }

  registrarse(): void {
    //peticionhttp();
  }
}
