import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  games = [
    {
      nombre: 'Individual', 
      precio: 0, 
      descripcion: 'En este divertido MODO DE JUEGO tu objetivo es combinar los números en la pantalla para conseguir el mayor puntaje posible. ¡Suerte!', 
      img: "../../../assets/card-img1.jpg"
    },
    {
      nombre: 'Multijugador',
      precio: 2.99, 
      descripcion: 'En este divertido MODO DE JUEGO tu objetivo es vaciar el tablero de números antes que tu contrincante. Si te descuidas un segundo, perderás la partida. ¡Suerte!', 
      img: "../../../assets/card-img2.jpg"
    }
  ];

  id: number = -1;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });
  }

  back(): void {
    this.router.navigate(['/home']);
  }

  iniciarPartida(): void {
    let idPartida = this.peticionCrearPartida();
    this.router.navigate(['/waiting-room', idPartida]);
  }

  peticionCrearPartida(): string {
    return '123';
  }
}
