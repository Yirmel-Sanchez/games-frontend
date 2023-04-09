import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('tokenAcceso')) {
      this.router.navigate(['/login']);
    }
    this.userName = localStorage.getItem('userName') || '';
    this.userBalance = Number(localStorage.getItem('userBalance')) || 0;
  }

  seleccionarJuego(idx: number){
    this.router.navigate(['/start-game', idx]);
  }

  actualizarSaldo(){
    this.router.navigate(['/balance']);
  }
}
