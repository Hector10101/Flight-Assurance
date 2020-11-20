import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import { listadopaises } from 'src/app/modelo/listadopaises';
import { delay, retry, retryWhen } from 'rxjs/operators';
import { parametros } from 'src/app/modelo/parametros.models';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  constructor(private VuelosServices: VuelosService, private router: Router) {
    this.MontoPrecio = '$000.00';
    this.MontoGlobal = 0;
    this.EscalaGlobal = null;
    this.paisorigen = 'DO';
    this.paisdestino = '';
    this.getListadodePaises();
    this.getTodosLosVuelos(this.getCurrentDateMasUno(), this.paisorigen, this.paisdestino, this.MontoGlobal , this.EscalaGlobal);

   }
  public listado: any = [];
  public paisorigen: any;
  public paisdestino: any;
  public Parametros: any;
  public Parametros1: any;



  public Nombrepaisorigen: any;
  public Nombrepaisdestino: any;
  public AereopuertoOrigen: any = [];
  public AereopuertoDestino: any = [];
  public TodoslosVuelos: any = [];
  public TodoslosVuelos1: any = [];
  private fechaactual = new Date();
  public ruta: any = [];
  public fecha: any = [];
  public aereolinea: any = [];
  public precio: any = [];
  private i1: any;
  public ruta1: any = [];
  public fecha1: any = [];
  public aereolinea1: any = [];
  public precio1: any = [];
  private nOrigen1: any;
  private nDestino1: any;


  private i: any;
  private x: any;
  private nOrigen: any;
  private nDestino: any;

  public rangoPrecio: any;
  public MontoPrecio: any;

      // tslint:disable-next-line: member-ordering
      private cortarfecha: any;

      // tslint:disable-next-line: member-ordering
      public ArregloFiltros: any = [];
      public ArregloFiltros1: any = [];
      public Arreglo2Filtros: any = [];
      public Arreglo2Filtros1: any = [];
      public MontoGlobal: any;
      public EscalaGlobal: any;

      public str:any = []; //pasar parametros al detalle
      public codigolugarOrigen:any;
      public codigolugarDestino:any;
      public strfecha:any = [];


  ngOnInit(): void {

    //$('#vuelos').addClass('active');
  }
  // tslint:disable-next-line: typedef
  getListadodePaises(){
    this.VuelosServices.ObtenerNombredePaises().subscribe((data: {}) => {
        this.listado = data;
        // console.log(this.listado);
      });
    }
    // tslint:disable-next-line: typedef
    getPaisesSeleccionado(){

      for (const pais of this.listado.Countries){
        // tslint:disable-next-line: triple-equals
        if (this.paisdestino == pais.Code){
          this.Nombrepaisdestino = pais.Name;
        }
        // tslint:disable-next-line: triple-equals
        if (this.paisorigen == pais.Code){
          this.Nombrepaisorigen = pais.Name;
        }
      }
      this.VuelosServices.ObtenerAereoPuertos(this.Nombrepaisorigen, this.paisorigen).subscribe((data: {}) => {
        this.AereopuertoOrigen = data;
      });
      this.VuelosServices.ObtenerAereoPuertos(this.Nombrepaisdestino, this.paisdestino).subscribe((data: {}) => {
        this.AereopuertoDestino = data;
      });

     /* console.log("Destino: " +this.paisdestino);
      console.log("Origen: " +this.paisorigen);*/

      this.getTodosLosVuelos(this.getCurrentDateMasUno(), this.paisorigen, this.paisdestino, this.MontoGlobal, this.EscalaGlobal);
    }
    // tslint:disable-next-line: typedef
    getTodosLosVuelos(fecha: any, origen: any, destino: any, precio: number, escala: any){
     this.VuelosServices.ObtenerTodosLosVuelos(fecha, origen, destino).subscribe((data: {}) => {
        this.TodoslosVuelos = data;
        this.i = 0;

        console.log(this.TodoslosVuelos);
        if ((precio < 100 && escala === null)){
          for ( const datos of this.TodoslosVuelos.Quotes){
            this.getVuelosFiltrar(datos);
            this.i++;
          }
        }else if ((precio >= 100) && (escala === true || escala === false)){
          this.ArregloFiltros = [];
          if (precio === 1000){
            for ( const datos of this.TodoslosVuelos.Quotes){
              if (escala === datos.Direct){
                this.getArregloVuelosFiltros(datos);
              }
            }
          }else{
            for ( const datos of this.TodoslosVuelos.Quotes){
              if (precio >= datos.MinPrice && escala === datos.Direct){
                this.getArregloVuelosFiltros(datos);
              }
            }
          }
          this.TodoslosVuelos.Quotes = this.ArregloFiltros;
        }else if ((precio >= 100) && (escala === null)){
          this.ArregloFiltros = [];
          if (precio === 1000){
            for ( const datos of this.TodoslosVuelos.Quotes){
              this.getArregloVuelosFiltros(datos);
            }
          }else{
            for ( const datos of this.TodoslosVuelos.Quotes){
              if (precio >= datos.MinPrice){
                this.getArregloVuelosFiltros(datos);
              }
            }
          }
          this.TodoslosVuelos.Quotes = this.ArregloFiltros;
        }else{
          this.ArregloFiltros = [];
          for ( const datos of this.TodoslosVuelos.Quotes){
            if (escala === datos.Direct){
              this.getArregloVuelosFiltros(datos);
            }
          }
          this.TodoslosVuelos.Quotes = this.ArregloFiltros;
        }
      });
     console.log(this.TodoslosVuelos.Quotes);
     this.getTodosLosVuelosDespues(this.getCurrentDateMasDos(), origen, destino, precio, escala);
    }

    // tslint:disable-next-line: typedef
    getArregloVuelosFiltros(Valor: Data){
      this.getVuelosFiltrar(Valor);
      this.ArregloFiltros[this.i] = Valor;
      this.i++;
    }
    // tslint:disable-next-line: typedef
    getVuelosFiltrar(Valor: Data){
      this.cortarfecha = Valor.OutboundLeg.DepartureDate;
      this.fecha[this.i] = this.cortarfecha.slice(0,  10);
      this.precio[this.i] = Valor.MinPrice;
      for (const airline of this.TodoslosVuelos.Carriers){
              // tslint:disable-next-line: triple-equals
              if (Valor.OutboundLeg.CarrierIds[0] == airline.CarrierId){
                this.aereolinea[this.i] = airline.Name;
              }
            }
      for ( const nombre of this.TodoslosVuelos.Places){
              // tslint:disable-next-line: triple-equals
              if (Valor.OutboundLeg.OriginId == nombre.PlaceId){
                this.nOrigen = nombre.IataCode;
               }
              // tslint:disable-next-line: triple-equals
              if (Valor.OutboundLeg.DestinationId == nombre.PlaceId){
                this.nDestino = nombre.IataCode;
              }
              this.ruta[this.i] = this.nOrigen + ' a ' + this.nDestino;
            }
    }
    // tslint:disable-next-line: typedef
    // tslint:disable-next-line: typedef
    getTodosLosVuelosDespues(fecha: any, origen: any, destino: any, precio: number, escala: any){
      this.VuelosServices.ObtenerTodosLosVuelos(fecha, origen, destino).subscribe((data: {}) => {
         this.TodoslosVuelos1 = data;
         this.i1 = 0;
         if ((precio < 100) && (escala === null)){
          for ( const datos of this.TodoslosVuelos1.Quotes){
            this.getVuelosFiltarDespues(datos);
            this.i1++;
           }
         }else if ((precio >= 100) && (escala === true || escala === false)){
          this.ArregloFiltros1 = [];
          if (precio === 1000){
            for ( const datos of this.TodoslosVuelos1.Quotes){
              if (escala === datos.Direct){
                this.getArregloVuelosFiltrosDespues(datos);
              }
             }
          }else{
            for ( const datos of this.TodoslosVuelos1.Quotes){
              if (precio >= datos.MinPrice && escala === datos.Direct){
                this.getArregloVuelosFiltrosDespues(datos);
               }
             }
          }
          this.TodoslosVuelos1.Quotes = this.ArregloFiltros1;
         }else if ((precio >= 100) && (escala === null)){
          this.ArregloFiltros1 = [];
          if (precio === 1000){
            for ( const datos of this.TodoslosVuelos1.Quotes){
              this.getArregloVuelosFiltrosDespues(datos);
             }
          }else {
            for ( const datos of this.TodoslosVuelos1.Quotes){
              if (precio >= datos.MinPrice){
                this.getArregloVuelosFiltrosDespues(datos);
               }
             }
          }
          this.TodoslosVuelos1.Quotes = this.ArregloFiltros1;
         }else{
          this.ArregloFiltros1 = [];
          for ( const datos of this.TodoslosVuelos1.Quotes){
            if (escala === datos.Direct){
              this.getArregloVuelosFiltrosDespues(datos);
             }
           }
          this.TodoslosVuelos1.Quotes = this.ArregloFiltros1;
        }
       });
     }
     // tslint:disable-next-line: typedef
     getArregloVuelosFiltrosDespues(Valor: Data){
      this.getVuelosFiltarDespues(Valor);
      this.ArregloFiltros1[this.i1] = Valor;
      this.i1++;
    }

    // tslint:disable-next-line: typedef
    getVuelosFiltarDespues(Valor: Data){
      this.cortarfecha = Valor.OutboundLeg.DepartureDate;
      this.fecha1[this.i1] = this.cortarfecha.slice(0, 10);
      this.precio1[this.i1] = Valor.MinPrice;
      for (const airline of this.TodoslosVuelos1.Carriers){
               // tslint:disable-next-line: triple-equals
               if (Valor.OutboundLeg.CarrierIds[0] == airline.CarrierId){
                 this.aereolinea1[this.i1] = airline.Name;
               }
             }
      for (const nombre of this.TodoslosVuelos1.Places){
               // tslint:disable-next-line: triple-equals
               if (Valor.OutboundLeg.OriginId == nombre.PlaceId){
                 this.nOrigen1 = nombre.IataCode;
                }
               // tslint:disable-next-line: triple-equals
               if (Valor.OutboundLeg.DestinationId == nombre.PlaceId){
                 this.nDestino1 = nombre.IataCode;
                }
               this.ruta1[this.i1] = this.nOrigen1 + ' a ' + this.nDestino1;
             }
    }
      getCurrentDateMasDos(): string{
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
        getCurrentDateMasUno(): string{
          let day: any = this.fechaactual.getDate() + 1;
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
          // tslint:disable-next-line: typedef
          filtradodePrecio(precio: HTMLInputElement){

            // tslint:disable-next-line: radix
            if (parseInt(precio.value) <= 100){
              this.MontoPrecio = '$' + precio.value;
            // tslint:disable-next-line: radix
            }else if (parseInt(precio.value) === 1000){
              this.MontoPrecio = '+$' + precio.value;
            }else {
              this.MontoPrecio = '<$' + precio.value;
            }
            // tslint:disable-next-line: radix
            this.MontoGlobal = parseInt(precio.value);


            this.getTodosLosVuelos(this.getCurrentDateMasUno(), this.paisorigen, this.paisdestino,
            this.MontoGlobal, this.EscalaGlobal);
          }
          // tslint:disable-next-line: typedef
          filtroEscala(escala: number){
            // console.log(escala);
            if (escala === 0){
              this.EscalaGlobal = false;
            }else if (escala === 1){
              this.EscalaGlobal = true;
            }else{
              this.EscalaGlobal = null;
            }

            this.getTodosLosVuelos(this.getCurrentDateMasUno(), this.paisorigen, this.paisdestino, this.MontoGlobal, this.EscalaGlobal);
          }
          onclickbtnInfo(params2: HTMLInputElement){
            //console.log(params2.value);
            var string = params2.value.split("/");
            var origin="", destination="";
            //console.log(string);
            this.str = string[0].split(" a ");

            console.log(this.str);

            for(let nombrepais of this.TodoslosVuelos['Places']){
              if(nombrepais.SkyscannerCode == this.str[0]){
                //Origen
                origin = nombrepais.CountryName;
                this.codigolugarOrigen = nombrepais.PlaceId;
              }
              if(nombrepais.SkyscannerCode == this.str[1]){
                //destino
                destination = nombrepais.CountryName;
                this.codigolugarDestino = nombrepais.PlaceId;
              }
             // console.log(nombrepais);
            }

            var fechamayor, fechamenor;

            for(let fechas of this.TodoslosVuelos['Quotes']){
              if((fechas['OutboundLeg'].OriginId == this.codigolugarOrigen) &&
                (fechas['OutboundLeg'].DestinationId == this.codigolugarDestino)){
                  fechamayor = fechas.QuoteDateTime;
                  fechamenor = fechas['OutboundLeg'].DepartureDate;
              }
            }

            console.log(fechamayor +" > " + fechamenor);

            var strfechallegada = fechamayor.split("T");
            var strfechasalida = fechamenor.split("T");

            let param: parametros = {ruta:string[0], fecha: string[1], aereolinea:string[2], 
            precio:string[3], nombreOrigen: origin, 
            nombreDestino: destination, codOrigen: this.str[0], codDestino:this.str[1],
            fechaLlegada: strfechasalida[0], fechaSalida: strfechallegada[0], horaLlegada: strfechallegada[1], horaSalida:strfechasalida[1], clasedevuelo:null};  

            this.VuelosServices.setStorageParametro(param);
            this.router.navigate(['/', 'detallesvuelo']);
          }
}
