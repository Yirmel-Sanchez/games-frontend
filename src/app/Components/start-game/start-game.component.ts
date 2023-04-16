import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/Services/error.service';
import { GamesService } from 'src/app/Services/games.service';

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
      img: "../../../assets/card-img1.jpg",
      key: 'nm_alone'
    },
    {
      nombre: 'Multijugador',
      precio: 2.99,
      descripcion: 'En este divertido MODO DE JUEGO tu objetivo es vaciar el tablero de números antes que tu contrincante. Si te descuidas un segundo, perderás la partida. ¡Suerte!',
      img: "../../../assets/card-img2.jpg",
      key: 'nm'
    }
  ];

  id: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private _gamesService: GamesService, private _errorService: ErrorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });
  }

  back(): void {
    this.router.navigate(['/home']);
  }

  iniciarPartida(): void {
    this._gamesService.requestGame(this.games[this.id].key, localStorage.getItem('tokenAcceso') || '').subscribe(
      (data) => {
        console.log(data);
        let idPartida = '0';
        this.router.navigate(['/waiting-room', data.id]);
      }, (error) => {
        console.log(error);
            
        if (error.status == 409) {
          this._errorService.setError('No se ha podido consultar el saldo del usuario');
        } else if (error.status == 403) {
          this._errorService.setError('Saldo insuficiente');
        } else if (error.status == 500) {
          this._errorService.setError('Error al asignar la partida');
        } else {
          console.log(error);
          this._errorService.setError('Error desconocido');
        }
      }
    );
  }
}
