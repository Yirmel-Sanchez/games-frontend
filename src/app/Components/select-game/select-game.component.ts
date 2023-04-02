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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seleccionarJuego(idx: number){
    this.router.navigate(['/start-game', idx]);
  }

  actualizarSaldo(){
    this.router.navigate(['/balance']);
  }
}
