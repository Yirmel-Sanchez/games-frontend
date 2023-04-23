import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  private boards: string = "";
  private board1$ = new Subject<string>();
  private board2$ = new Subject<string>();
  private namePlayer2: string = "";

  setBoard(board: string, num: number) {
    if (num == 1) {
      this.board1$.next(board);
    } else {
      this.board2$.next(board);
    }
  }

  getBoard(num: number): Observable<string> {
    if (num == 1)
      return this.board1$.asObservable();
    return this.board2$.asObservable();
  }


  setNamePlayer2(player2: string) {
    console.log("set name player 2: " + player2);
    this.namePlayer2 = player2;
  }

  getNamePlayer2(): string {
    return this.namePlayer2;
  }

  setBoards(boards: string) {
    console.log("set boards: " + boards);
    this.boards= boards;
  }

  getBoards(): string {
    return this.boards;
  }

  private apiUrl = 'http://localhost:8084';

  public requestGame(juego: string, idPlayer: string): Observable<any> {
    const params = { juego, idPlayer };
    return this.http.get<any>(this.apiUrl + "/games/requestGame", { params });
  }

  public leaveGame(idMatch: string, idPlayer: string): Observable<any> {
    console.log("leaveGame: " + idMatch + " " + idPlayer);
    const body = {
      idMatch: idMatch,
      idPlayer: idPlayer
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl + "/games/leaveGame", body, httpOptions);
  }

}
