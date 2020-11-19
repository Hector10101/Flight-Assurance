import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router } from '@angular/router';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import { listadopaises } from 'src/app/modelo/listadopaises';
import { delay, retry, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  public listado: any=[]; 
  public paisorigen: any;
  public paisdestino: any;


  public Nombrepaisorigen: any;
  public Nombrepaisdestino: any;
  public AereopuertoOrigen: any = [];
  public AereopuertoDestino: any = [];
  public TodoslosVuelos: any = [];
  public TodoslosVuelos1: any = [];
  private fechaactual= new Date();
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
  private nOrigen: any;
  private nDestino: any;

  public rangoPrecio: any;
  public MontoPrecio: any;


  constructor(private VuelosServices: VuelosService, private router: Router) {
    this.MontoPrecio= "$000.00"; 
    this.getListadodePaises();
    this.getTodosLosVuelos(this.getCurrentDateMasUno(),"DO","US",0,null); 
   }

  ngOnInit(): void {
   
  }
 
  getListadodePaises(){
    this.VuelosServices.ObtenerNombredePaises().subscribe((data: {}) => {
        this.listado = data; 
        //console.log(this.listado);
      });
    }
    getPaisesSeleccionado(){

      for(let pais of this.listado['Countries']){
        if(this.paisdestino == pais.Code){
            this.Nombrepaisdestino = pais.Name;
        }
        if(this.paisorigen == pais.Code){
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

      this.getTodosLosVuelos(this.getCurrentDateMasUno(),this.paisorigen,this.paisdestino,0,null); 

    } 

      private cortarfecha: any;

      public ArregloFiltros: any = [];
      public ArregloFiltros1: any = [];
    getTodosLosVuelos(fecha: any, origen: any, destino: any, precio: number, escala:any){
     this.VuelosServices.ObtenerTodosLosVuelos(fecha, origen, destino).subscribe((data: {}) => {
        this.TodoslosVuelos= data; 
        this.i = 0;

        if((precio < 100 && escala==null)){
          for( let datos of this.TodoslosVuelos['Quotes']){
            this.cortarfecha = datos['OutboundLeg'].DepartureDate;
            this.fecha[this.i] = this.cortarfecha.slice(0,10);
            this.precio[this.i] = datos.MinPrice;
            for(let airline of this.TodoslosVuelos['Carriers']){
              if(datos['OutboundLeg']['CarrierIds'][0]== airline.CarrierId){
                this.aereolinea[this.i] = airline.Name;
              }
            }
            for(let nombre of this.TodoslosVuelos['Places']){
              if(datos['OutboundLeg']['OriginId']== nombre.PlaceId){
                this.nOrigen = nombre.IataCode;
               }
               if(datos['OutboundLeg']['DestinationId']== nombre.PlaceId){
                this.nDestino = nombre.IataCode;
              }
               this.ruta[this.i] = this.nOrigen + " a "+ this.nDestino;
            }
            this.i++;
          }
        }else{
          this.ArregloFiltros = [];
          for( let datos of this.TodoslosVuelos['Quotes']){
            if(precio >= datos.MinPrice){
              this.cortarfecha = datos['OutboundLeg'].DepartureDate;
              this.fecha[this.i] = this.cortarfecha.slice(0,10);
              this.precio[this.i] = datos.MinPrice;
              for(let airline of this.TodoslosVuelos['Carriers']){
                if(datos['OutboundLeg']['CarrierIds'][0]== airline.CarrierId){
                  this.aereolinea[this.i] = airline.Name;
                }
              }
              for(let nombre of this.TodoslosVuelos['Places']){
                if(datos['OutboundLeg']['OriginId']== nombre.PlaceId){
                  this.nOrigen = nombre.IataCode;
                }
                if(datos['OutboundLeg']['DestinationId']== nombre.PlaceId){
                  this.nDestino = nombre.IataCode;
                }
                this.ruta[this.i] = this.nOrigen + " a "+ this.nDestino;
              }
              this.ArregloFiltros[this.i]= datos;
              this.i++;
            } 
          }
          this.TodoslosVuelos['Quotes'] = this.ArregloFiltros;
          console.log(escala);
        }


        console.log(escala);
  
      });
    // this.getTodosLosVuelosDespues(this.getCurrentDateMasDos(),origen,destino,precio); 
    }
    getTodosLosVuelosDespues(fecha: any,origen: any, destino: any, precio:number){
      this.VuelosServices.ObtenerTodosLosVuelos(fecha,origen,destino).subscribe((data: {}) => {
         this.TodoslosVuelos1= data; 
         this.i1 = 0;
         if(precio<100){
          for( let datos of this.TodoslosVuelos1['Quotes']){
            this.cortarfecha = datos['OutboundLeg'].DepartureDate;
            this.fecha1[this.i1] = this.cortarfecha.slice(0,10);
             this.precio1[this.i1] = datos.MinPrice;
             for(let airline of this.TodoslosVuelos1['Carriers']){
               if(datos['OutboundLeg']['CarrierIds'][0]== airline.CarrierId){
                 this.aereolinea1[this.i1] = airline.Name;
               }
             }
             for(let nombre of this.TodoslosVuelos1['Places']){
               if(datos['OutboundLeg']['OriginId']== nombre.PlaceId){
                 this.nOrigen1 = nombre.IataCode;
                }
                if(datos['OutboundLeg']['DestinationId']== nombre.PlaceId){
                 this.nDestino1 = nombre.IataCode;
                }
                this.ruta1[this.i1] = this.nOrigen1 + " a "+ this.nDestino1;
             }
             this.i1++;
           }
         }else{
          this.ArregloFiltros1 = [];
          for( let datos of this.TodoslosVuelos1['Quotes']){
            if(precio >= datos.MinPrice){
              this.cortarfecha = datos['OutboundLeg'].DepartureDate;
              this.fecha1[this.i1] = this.cortarfecha.slice(0,10);
              this.precio1[this.i1] = datos.MinPrice;
              for(let airline of this.TodoslosVuelos1['Carriers']){
                if(datos['OutboundLeg']['CarrierIds'][0]== airline.CarrierId){
                 this.aereolinea1[this.i1] = airline.Name;
                }
              }
              for(let nombre of this.TodoslosVuelos1['Places']){
                if(datos['OutboundLeg']['OriginId']== nombre.PlaceId){
                 this.nOrigen1 = nombre.IataCode;
                }
                if(datos['OutboundLeg']['DestinationId']== nombre.PlaceId){
                 this.nDestino1 = nombre.IataCode;
               }
                this.ruta1[this.i1] = this.nOrigen1 + " a "+ this.nDestino1;
              }
              this.ArregloFiltros1[this.i1]= datos;
              this.i1++;
             }
           }
           this.TodoslosVuelos1['Quotes'] = this.ArregloFiltros1;
         }
       });
     }

      getCurrentDateMasDos(): string{
        let day:any = this.fechaactual.getDate()+2;
        let month:any = this.fechaactual.getMonth() + 1;
        let year:any = this.fechaactual.getFullYear();
        let fecha: string;
        
        if(day<10){
        day = "0" + day.toString();
        }
        if(month<10){
        month = "0" + month.toString();
        }
        fecha = year.toString() + "-" + month + "-" + day;
        return fecha;
        }
        getCurrentDateMasUno(): string{
          let day:any = this.fechaactual.getDate() +1;
          let month:any = this.fechaactual.getMonth() + 1;
          let year:any = this.fechaactual.getFullYear();
          let fecha: string;
          
          if(day<10){
          day = "0" + day.toString();
          }
          if(month<10){
          month = "0" + month.toString();
          }
          fecha = year.toString() + "-" + month + "-" + day;
          return fecha;
          }

          filtradodePrecio(precio: HTMLInputElement){

            if(parseInt(precio.value)<=100){
              this.MontoPrecio = "$"+precio.value;
            }else{
              this.MontoPrecio = "<$"+precio.value;
            }
            this.getTodosLosVuelos(this.getCurrentDateMasUno(),"DO","US",parseInt(precio.value),null);
          }

          filtroEscala(escala:boolean){
            //console.log(escala);
            this.getTodosLosVuelos(this.getCurrentDateMasUno(),"DO","US",0,escala);
          }
        
}
