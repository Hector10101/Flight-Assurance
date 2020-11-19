import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from "@angular/common/http/";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { listadopaises } from '../modelo/listadopaises';
import { listadoaereopuertos } from '../modelo/listadoaereopuertos';


@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private ApiPaises ='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/es-ES';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "x-rapidapi-key": "7d86169ac5msh62f24b9522bf920p1a83b0jsn9c45c15dbaa6",
		  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    })
  }

  ObtenerNombredePaises(): Observable<listadopaises> {
    return this.http.get<listadopaises>(`${this.ApiPaises}`, this.httpOptions)
    .pipe(
      retry(1),
    )
  }


  ObtenerAereoPuertos(nombrePais: any, codigo: any): Observable<listadoaereopuertos> {
     let ApiAereopuertos = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${codigo}/USD/es-ES/?query=
     ${nombrePais}`;

    return this.http.get<listadoaereopuertos>(`${ApiAereopuertos}`, this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  ObtenerTodosLosVuelos(fecha: any, origen: any, destino: any): Observable<listadoaereopuertos> {


    let ApiAereopuertos = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${origen}-sky/${destino}-sky/${fecha}`;

   return this.http.get<listadoaereopuertos>(`${ApiAereopuertos}`, this.httpOptions)
   .pipe(
     retry(1),
   )
 }


 


}
 