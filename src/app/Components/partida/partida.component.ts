import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {
  idPartida: string = "AB1234CD";
  constructor() { }

  ngOnInit(): void {
  }

  abandonarPartida(): void {

  }

}
