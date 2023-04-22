import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  private boards$ = new Subject<string>();

  setBoards(boards: string) {
    this.boards$.next(boards);
  }

  getBoards(): Observable<string> {
    return this.boards$.asObservable();
  }

  private apiUrl = 'http://localhost:8084';

  public requestGame(juego: string, idPlayer: string): Observable<any> {
    const params = { juego, idPlayer };
    return this.http.get<any>(this.apiUrl+"/games/requestGame", { params });
  }

  public leaveGame(idMatch: string, idPlayer: string): Observable<any> {
    console.log("leaveGame: "+idMatch+" "+idPlayer);
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
