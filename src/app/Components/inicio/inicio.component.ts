import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import { parametros } from 'src/app/modelo/parametros.models';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public TodoslosVuelos: any = [];
  public Vuelos3: any = [];
  public VuelosInicio: any = [];
  private fechaactual = new Date();

  private i: any;
  public ruta: any = [];
  public fecha: any = [];
  public aereolinea: any = [];
  public precio: any = [];
  private nOrigen: any;
  private nDestino: any;

      public str: any = []; // pasar parametros al detalle
      public codigolugarOrigen: any;
      public codigolugarDestino: any;
      public strfecha: any = [];

      public Parametros: any;
      private cortarfecha: any;

  constructor(private VuelosServices: VuelosService, private router: Router) { }

  ngOnInit(): void {
    this.getTodosLosVuelos(this.getCurrentDateMasCuatro(), 'DO', 'US');
  }


  // tslint:disable-next-line: typedef
  getTodosLosVuelos(fecha: any, origen: any, destino: any){
    this.VuelosServices.ObtenerTodosLosVuelos(fecha, origen, destino).subscribe((data: {}) => {
      this.TodoslosVuelos = data;
      this.i = 0;
      for (let i = 0; i <= 2; i++) {
        this.VuelosInicio[i] = this.TodoslosVuelos.Quotes[i];
      }

      for ( const datos of this.VuelosInicio){
          this.cortarfecha = datos.OutboundLeg.DepartureDate;
          this.fecha[this.i] = this.cortarfecha.slice(0,  10);
          this.precio[this.i] = datos.MinPrice;

          for (const airline of this.TodoslosVuelos.Carriers){
            // tslint:disable-next-line: triple-equals
            if (datos.OutboundLeg.CarrierIds[0] == airline.CarrierId){
              this.aereolinea[this.i] = airline.Name;
            }
          }

          for ( const nombre of this.TodoslosVuelos.Places){
            // tslint:disable-next-line: triple-equals
            if (datos.OutboundLeg.OriginId == nombre.PlaceId){
              this.nOrigen = nombre.IataCode;
              }
            // tslint:disable-next-line: triple-equals
            if (datos.OutboundLeg.DestinationId == nombre.PlaceId){
              this.nDestino = nombre.IataCode;
            }
            this.ruta[this.i] = this.nOrigen + ' a ' + this.nDestino;
          }

          this.i++;
        }

      console.log(this.VuelosInicio);

    });

  }

  // tslint:disable-next-line: typedef
  onclickbtnInfo(params2: HTMLInputElement){
    // console.log(params2.value);
    // tslint:disable-next-line: variable-name
    const string = params2.value.split('/');
    // tslint:disable-next-line: one-variable-per-declaration
    let origin = '', destination = '';
    // console.log(string);
    this.str = string[0].split(' a ');

    console.log(this.str);

    for (const nombrepais of this.TodoslosVuelos.Places){
      if (nombrepais.SkyscannerCode === this.str[0]){
        // Origen
        origin = nombrepais.CountryName;
        this.codigolugarOrigen = nombrepais.PlaceId;
      }
      // tslint:disable-next-line: triple-equals
      if (nombrepais.SkyscannerCode == this.str[1]){
        // destino
        destination = nombrepais.CountryName;
        this.codigolugarDestino = nombrepais.PlaceId;
      }
      // console.log(nombrepais);
    }

    // tslint:disable-next-line: one-variable-per-declaration
    let fechamayor, fechamenor;

    for (const fechas of this.TodoslosVuelos.Quotes){
      // tslint:disable-next-line: triple-equals
      if ((fechas.OutboundLeg.OriginId == this.codigolugarOrigen) &&
        // tslint:disable-next-line: triple-equals
        (fechas.OutboundLeg.DestinationId == this.codigolugarDestino)){
          fechamayor = fechas.QuoteDateTime;
          fechamenor = fechas.OutboundLeg.DepartureDate;
      }
    }
    console.log(fechamayor + ' > ' + fechamenor);

    const strfechallegada = fechamayor.split('T');
    const strfechasalida = fechamenor.split('T');


    const param: parametros = {ruta: string[0], fecha: string[1], aereolinea: string[2],
    precio: string[3], nombreOrigen: origin,
    nombreDestino: destination, codOrigen: this.str[0], codDestino: this.str[1],
    // tslint:disable-next-line: max-line-length
    fechaLlegada: strfechasalida[0], fechaSalida: strfechallegada[0], horaLlegada: strfechallegada[1], horaSalida: strfechasalida[1], clasedevuelo: null};

    this.VuelosServices.setStorageParametro(param);
    this.router.navigate(['/', 'detallesvuelo']);
  }

  getCurrentDateMasCuatro(): string{
    let day: any = this.fechaactual.getDate() + 2;
    let month: any = this.fechaactual.getMonth() + 1;
    const year: any = this.fechaactual.getFullYear();
    let fecha: string;

    if (day < 10){
    day = '0' + day.toString();
    }
    if (month < 10){
    month = '0' + month.toString();
    }
    fecha = year.toString() + '-' + month + '-' + day;
    return fecha;
  }
}
