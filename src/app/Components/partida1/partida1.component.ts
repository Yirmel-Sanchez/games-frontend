import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/Services/error.service';
import { GamesService } from 'src/app/Services/games.service';

@Component({
  selector: 'app-partida1',
  templateUrl: './partida1.component.html',
  styleUrls: ['./partida1.component.css']
})
export class Partida1Component implements OnInit {

  player = localStorage.getItem('userName') || '';
  board = "";

  constructor(private router:Router, private _gamesService: GamesService, private _errorService:ErrorService) { }

  ngOnInit(): void {
    this._gamesService.getBoardAlone().subscribe(
      (data) => {
        console.log(data);
        this.board = data.board;
      }, (error) => {
        console.log(error); //por hacer
        this.router.navigate(['/home']);
        this._errorService.setError("Error al iniciar la partida");
      }
    );
  }

  abandonarPartida():void{
    this.router.navigate(['/home']);
    return;
  }

  clickAdd():void{
    this._gamesService.addNumbersAlone().subscribe(
      (data) => {
        console.log(data);
        this.board = data.board;
      }, (error) => {
        console.log(error); 
        this._errorService.setError("Error al añadir numeros");
      });
  }

  move(move:string){
    let vacio = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    this._gamesService.moveAlone(move).subscribe(
      (data) => {
        console.log(data);
        if(data.board == vacio){
          this.router.navigate(['/result', localStorage.getItem('userName') || '']);
          return;
        }else{
          this.board = data.board;
        }
      }, (error) => {
        console.log(error); 
        this._errorService.setError("Error al intentar realizar un movimiento");
      }
    );
  }
}
