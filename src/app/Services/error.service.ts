import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  private error$ = new Subject<string>();
  private tipoError$ = new Subject<string>();

  // ************************* gestion de errores ************************

  setError(mensaje: string) {
    // establece el mensaje de error y el tipo de error
    this.error$.next(mensaje);
    this.tipoError$.next('error');
  }

  setInfo(mensaje: string) {
    // establece el mensaje de error y el tipo de error
    this.error$.next(mensaje);
    this.tipoError$.next('info');
  }

  setSuccess(mensaje: string) {
    // establece el mensaje de error y el tipo de error
    this.error$.next(mensaje);
    this.tipoError$.next('success');
  }

  getError(): Observable<string> {
    // devuelve el mensaje de error
    return this.error$.asObservable();
  }

  getTipoError(): Observable<string> {
    // devuelve el tipo de error
    return this.tipoError$.asObservable();
  }


}
