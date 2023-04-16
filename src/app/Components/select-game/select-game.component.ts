import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/Services/error.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.css']
})
export class SelectGameComponent implements OnInit {
  
  games = [
    {
      nombre: 'Individual', 
      img: "../../../assets/card-img1.jpg"
    },
    {
      nombre: 'Multijugador',
      img: "../../../assets/card-img3.jpg"
    }
  ];

  userName: string = '';
  userBalance: number = 0;

  constructor(private router: Router, private _usersService: UsersService, private _errorService: ErrorService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('tokenAcceso')) {
      this.router.navigate(['/login']);
    }
    this.userName = localStorage.getItem('userName') || '';
    this.consultarSaldoUsuario();
  }

  seleccionarJuego(idx: number){
    this.router.navigate(['/start-game', idx]);
  }

  actualizarSaldo(){
    this.router.navigate(['/balance']);
  }

  consultarSaldoUsuario(): void {
    this._usersService.consultarSaldoUsuario().subscribe(
      (data) => {
        console.log(data);
        this.userBalance = data.body.userBalance;
      },
      (error) => {
        console.log(error);
        this._errorService.setError("Error al consultar el saldo del usuario");
      }
    );
  }
}
