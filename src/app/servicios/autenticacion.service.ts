import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http/';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { authuser } from '../modelo/authuser.models';
import { administrador } from '../modelo/administrador';
import { clientes } from '../modelo/clientes';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private headers = 'https://cors-anywhere.herokuapp.com/';
  private api = 'http://erickps29-001-site1.gtempurl.com/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line: typedef
  UsuarioLogueado(usuario: authuser) {
    localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
  }

  ObtenerClientes(): Observable<clientes> {
    return this.http.get<clientes>(`${this.headers}${this.api}/cliente`, this.httpOptions)
    .pipe(
      retry(1),
    );
  }

  PostearCliente(cliente: any = []): Observable<clientes> {
    return this.http.post<clientes>(`${this.headers}${this.api}/cliente`, JSON.stringify(cliente), this.httpOptions)
    .pipe(
      retry(1),
    );
  }

  ObtenerAdministrador(): Observable<administrador> {
    return this.http.get<administrador>(`${this.headers}${this.api}/administrador`)
    .pipe(
      retry(1),
    );
  }
}
