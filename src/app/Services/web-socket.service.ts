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

  connect(): void {
    const wsUrl = 'ws://localhost:8084/wsGames';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.eventSubject$.next({ type: 'open' });
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


}
