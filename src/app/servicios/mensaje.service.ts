import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http/';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  private api = 'https://intentoa.herokuapp.com/formulario';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line: typedef
  sendMessage(body: any) {
    return this._http.post(`${this.api}`, body, this.httpOptions);
  }
}
