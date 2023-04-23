import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, OnChanges, ViewChild, SimpleChanges, Output } from '@angular/core';
import { take } from 'rxjs';
import { GamesService } from 'src/app/Services/games.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  @ViewChild('tablero', { static: false }) tableroDiv!: ElementRef;
  @Output() pairSelected = new EventEmitter<string>();

  @Input() matrizTablero: number[][][] = [];
  @Input() tablero: string = "";
  @Input() player: string = "";
  @Input() propio: boolean = false;

  /*matriz3d: number[][][] =
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
    ];*/

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
  pos1 = "";
  pos2 = "";


  constructor(private _gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.matrizTablero = this.getBoard(this.tablero);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('tablero' in changes) {
      console.log("board recibido: " + this.tablero);
      this.matrizTablero = this.getBoard(this.tablero);
    }
  }

  getBoard(board: string): number[][][] {
    const matriz: number[][][] = Array(9)
      .fill(null).map(() => Array(9).fill(null).map(() => [0, 0]));
    const numbers = board.split(',').map(Number);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let k = 0; k < 2; k++) {
          matriz[i][j][k] = numbers[i * 18 + j * 2 + k];
          console.log("matriz " + i + j + k + ":" + matriz[i][j][k]);
        }
      }
    }

    return matriz;
  }

  clickCelda(x: number, y: number): void {
    if (!this.propio) 
      return;
      
    if (this.matrizTablero[x][y][1] === 0)
      return;

    switch (this.numSel) { //0 seleccionadas
      case 0:
        this.celdasSel[x][y] = true;
        this.numSel++;
        this.pos1 = x + "," + y;
        break
      case 1:
        if (this.celdasSel[x][y]) {
          this.celdasSel[x][y] = false;
          this.numSel--;
        } else {
          this.celdasSel[x][y] = true;
          this.numSel++;
          this.pos2 = x + "," + y;
          //alert("Dos celdas seleccionadas");
          this.unSelect();
          //emitir evento par seleccionado
          this.pairSelected.emit(this.pos1+","+this.pos2);
        }
        break
      default:
        this.unSelect();
    }
  }

  unSelect(): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.celdasSel[i][j] = false;
      }
    }
    this.numSel = 0;
  }
}
