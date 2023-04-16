import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/Services/error.service';
import { GamesService } from 'src/app/Services/games.service';
import { WebSocketService } from 'src/app/Services/web-socket.service';

@Component({
  selector: 'app-wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent implements OnInit {

  idMatch: string = "";
  ws?: WebSocket;

  constructor(private route: ActivatedRoute, private router: Router, private _webSocketService: WebSocketService, private _gamesService: GamesService, private _errorService: ErrorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idMatch = params['id'];
    });
    this._webSocketService.connect();
    this._webSocketService.onEvent().subscribe((event: any) => {
      console.log(event);
    });
  }

  abandonarPartida():void {
    if(this.peticionAbandonarPartida()){
      this._gamesService.leaveGame(this.idMatch, localStorage.getItem('tokenAcceso') || '').subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/home']);
        }, (error) => {
          this._errorService.setError('Error al abandonar la partida');
        }
      );
    } else {
      this.router.navigate(['/result', this.idMatch]);
    }
  }

  peticionAbandonarPartida(): boolean {
    if(true){
      return true; //no hay jugadores en la partida
    } else {
      return false; //hay jugadores en la partida
    }
  }
}
