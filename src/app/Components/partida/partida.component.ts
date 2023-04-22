import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/Services/web-socket.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  idMatch: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private _webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idMatch = params['id'];
    });
    this._webSocketService.onEvent().subscribe((event: any) => {
      console.log(event);
      if (event.type == 'message') {
        let data = JSON.parse(event.data);
        if (data.type == 'MATCH FINISHED') {
          this.router.navigate(['/result', data.winner]);
        }
      }
    });
  }

  abandonarPartida(): void {
    this._webSocketService.leaveGame(this.idMatch);
  }

}
