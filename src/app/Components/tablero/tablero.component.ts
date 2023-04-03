import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  matriz3d: number[][][] =
    [
      [[9, 1], [1, 1], [6, 0], [8, 0], [2, 1], [7, 0], [8, 0], [9, 1], [7, 1]],
      [[8, 1], [4, 0], [2, 0], [3, 1], [9, 1], [2, 0], [3, 1], [6, 0], [1, 1]],
      [[6, 1], [9, 0], [5, 0], [8, 1], [6, 1], [6, 0], [5, 1], [9, 0], [5, 0]],
      [[5, 1], [1, 1], [6, 1], [1, 1], [5, 0], [2, 0], [6, 0], [7, 1], [5, 0]],
      [[8, 1], [9, 0], [3, 1], [1, 0], [7, 1], [4, 0], [0, 0], [0, 0], [0, 0]],
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    ];

  celdasSel: boolean[][] =
    [
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
    ];

  numSel: number = 0;
  nombreJugador: string = "Jugador 1";


  constructor() { }

  ngOnInit(): void {
  }

  clickCelda(x: number, y: number): void {
    if(this.matriz3d[x][y][1]===0){
      return
    }
    switch (this.numSel) { //0 seleccionadas
      case 0:
        this.celdasSel[x][y] = true;
        this.numSel++;
        break
      case 1:
        if (this.celdasSel[x][y]) {
          this.celdasSel[x][y] = false;
          this.numSel--;
        } else {
          this.celdasSel[x][y] = true;
          this.numSel++;
        }
        break
      default:
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            this.celdasSel[i][j] = false;
          }
        }
        this.numSel=0;
    }
  }
}
