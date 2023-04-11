import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8082';

  // ************************* Preparar el pago ************************
  public prepay(cant: number): Observable<any> {
    return this.http.get(this.apiUrl + "/payments/prepay?cant=" + cant, {
      withCredentials: true,
      observe: "response",
      responseType: "text"
    });
  }

  // ************************* Confirmar el pago ************************
  confirm(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/payments/confirm", {
      withCredentials: true,
      observe: "response"
    })
  }

}
