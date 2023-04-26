import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws?: WebSocket;
  private eventSubject$: Subject<any> = new Subject<any>();
  private messageSubject$: Subject<any> = new Subject<any>();

  constructor() { }

  connect(idMatch:string): void {
    //const wsUrl = 'ws://localhost:8084/wsGames?idMatch='+idMatch+'&idUser='+localStorage.getItem('tokenAcceso');
    const wsUrl = 'ws://localhost:8084/wsGames?idMatch='+idMatch+'&nameUser='+localStorage.getItem('userName');
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.eventSubject$.next({ type: 'open' });
      this.playerReady(idMatch);
    };

    this.ws.onmessage = (event) => {
      this.eventSubject$.next({ type: 'message', data: event.data });
    };

    this.ws.onclose = () => {
      this.eventSubject$.next({ type: 'close' });
    };
  }

  onEvent(): Observable<any> {
    return this.eventSubject$.asObservable();
  }

  playerReady(idMatch:string): void {
    this.ws?.send(JSON.stringify({ type: 'PLAYER READY', idMatch: idMatch }));
  }

  leaveGame(idMatch: string) {
    this.ws?.send(JSON.stringify({ type: 'LEAVE GAME', nameUser: localStorage.getItem('userName'), matchId: idMatch }));
  }

  sendMove(idMatch: string, mensaje: string) {
    this.ws?.send(JSON.stringify({ type: 'MOVEMENT', nameUser: localStorage.getItem('userName'), matchId: idMatch, move: mensaje }));
  }

  sendAdd(idMatch: string) {
    this.ws?.send(JSON.stringify({ type: 'ADD NUMBERS', nameUser: localStorage.getItem('userName'), matchId: idMatch}));
  }

}
