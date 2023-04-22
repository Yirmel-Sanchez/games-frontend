import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/Services/games.service';
import { WebSocketService } from 'src/app/Services/web-socket.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  idMatch: string = "";
  board1: string = "";
  board2: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private _webSocketService: WebSocketService, private _gamesService: GamesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idMatch = params['id'];
    });
    this._gamesService.getBoards().subscribe((boards: string) => {
      this.getBoards(boards);
      console.log(this.board1);
      console.log(this.board2);
    });
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
  }
  getBoards(boards: string) {
    let json = JSON.parse(boards);
    for (let key in json) {
      if (key == localStorage.getItem('userName')) {
        this.board1 = json[key];
      } else {
        this.board2 = json[key];
      }
    }
  }

  updateBoards(boards: any) {
    throw new Error('Method not implemented.');
  }

  abandonarPartida(): void {
    this._webSocketService.leaveGame(this.idMatch);
  }

}
