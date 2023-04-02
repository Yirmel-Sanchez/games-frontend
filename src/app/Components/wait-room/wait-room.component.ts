import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent implements OnInit {

  id: string = "";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  abandonarPartida():void {
    if(this.peticionAbandonarPartida()){
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/result', this.id]);
    }
  }

  peticionAbandonarPartida(): boolean {
    if(false){
      return true; //no hay jugadores en la partida
    } else {
      return false; //hay jugadores en la partida
    }
  }
}
