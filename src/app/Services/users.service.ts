import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8082';

  // ************************* token de usuarios ************************
  public setUserData(data: any): void {
    localStorage.setItem('tokenAcceso', data?.userId);
    localStorage.setItem('userName', data?.userName);
    localStorage.setItem('userBalance', data?.userBalance);
  }

  // ************************* registro de usuarios ************************
  public register(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiUrl + "/users/register", data, httpOptions);
  }

  // ************************* login de usuarios ************************
  public login(name: string, password: string): Observable<any> {
    const body = {
      name: name,
      pwd: password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // habilita la inclusión de cookies y encabezados de autenticación
    };

    return this.http.put<any>(this.apiUrl + "/users/login", body, httpOptions);
  }

  // ************************* saldo de usuarios ************************
  consultarSaldoUsuario(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/users/balance/"+localStorage.getItem('tokenAcceso'), {
      withCredentials: true,
      observe: "response"
    })
  }
}