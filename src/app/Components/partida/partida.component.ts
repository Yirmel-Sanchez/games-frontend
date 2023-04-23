import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { GamesService } from 'src/app/Services/games.service';
import { WebSocketService } from 'src/app/Services/web-socket.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  idMatch: string = "";
  player1: string = "";
  player2: string = "";
  board1: string = "";
  board2: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private _webSocketService: WebSocketService, private _gamesService: GamesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idMatch = params['id'];
    });
    
    this.getBoards(this._gamesService.getBoards());

    this._webSocketService.onEvent().subscribe((event: any) => {
      console.log(event);
      if (event.type == 'message') {
        let data = JSON.parse(event.data);
        if (data.type == 'MATCH FINISHED') {
          this.router.navigate(['/result', data.winner]);
        } else if (data.type == 'UPDATE BOARDS'){
          this.updateBoards(data.boards);
        }
      }
    });
    this.player1 = localStorage.getItem('userName') || "";
    this.player2 = this._gamesService.getNamePlayer2();
  }
  
  getBoards(boards: any) {
    console.log(boards);
    for (let key in boards) {
      if (key == localStorage.getItem('userName')) {
        this.board1 = boards[key];
        console.log(this.board1);
      } else {
        this.board2 = boards[key];
        console.log(this.board2);
        this._gamesService.setNamePlayer2(key);
      }
    }
  }

  updateBoards(boards: any) {
    this._gamesService.setBoards(boards);
    this.getBoards(boards);
    console.log("boards actualizados: "+boards);
    
  }

  abandonarPartida(): void {
    this._webSocketService.leaveGame(this.idMatch);
  }

  clickAdd(): void {
    this.board1 = this.board1.replace('0', '1')
    console.log(this.board1);
  }

  move(mensaje: string): void {
    this._webSocketService.sendMove(this.idMatch, mensaje);
  }
}
