import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-v-detalles',
  templateUrl: './v-detalles.component.html',
  styleUrls: ['./v-detalles.component.css']
})
export class VDetallesComponent implements OnInit {


   public ruta: any;
   public fecha: any;
   public aereolinea: any;
   public precio: any;
   public origen: any;
   public destino: any;
   public fechasalida: any;
   public fechallegada: any;
   public horallegada: any;
   public horasalida: any;
   public clase= "economica";

   public codorigen: any;
   public coddestino: any;

   private Bundle: any = [];
   public listado: any = [];
   public terminal: any;


  constructor(private VuelosServices: VuelosService, private router: Router) {
    this.getListadodePaises();
   }

  ngOnInit(): void {
   this.Bundle =  JSON.parse(localStorage.getItem('VueloElegido') || '{}');
   if (this.Bundle.nombreOrigen != null){
      this.fecha = this.Bundle.fechaSalida;
      this.aereolinea = this.Bundle.aereolinea;
      this.precio = this.Bundle.precio;
      this.origen = this.Bundle.nombreOrigen;
      this.destino = this.Bundle.nombreDestino;
      this.codorigen = this.Bundle.codOrigen;
      this.coddestino = this.Bundle.codDestino;
      this.fechasalida = this.Bundle.fechaSalida;
      this.fechallegada = this.Bundle.fechaLlegada;
      this.ruta = this.Bundle.ruta;
      this.horallegada= this.Bundle.horaLlegada;
      this.horasalida = this.Bundle.horaSalida;

    let possible = "A1B2C3D4";
    const lengthOfCode = 2;
    this.makeRandom(lengthOfCode, possible);
    }else{
      this.router.navigate(['/', 'vuelos']);
    }

   console.log(this.Bundle.nombreOrigen);
  }
 

  // tslint:disable-next-line: typedef
  getListadodePaises(){
    this.VuelosServices.ObtenerNombredePaises().subscribe((data: {}) => {
        this.listado = data;
      });
    }

    // tslint:disable-next-line: typedef
    onclickCompletarDatos(){
      if (this.origen != null){
        const vueloDetalle = {
          ruta: this.ruta,
          fecha: this.fecha,
          aereolinea: this.aereolinea,
          precio: this.precio,
          nombreOrigen: this.origen,
          nombreDestino: this.destino,
          codOrigen: this.codorigen,
          codDestino: this.coddestino,
          fechaLlegada: this.fechallegada,
          fechaSalida: this.fechasalida,
          horaLlegada: this.horallegada,
          horaSalida: this.horasalida,
          clasedevuelo: this.clase,
          terminal: this.terminal
        };
        localStorage.setItem('VueloElegido', JSON.stringify(vueloDetalle));

        this.router.navigate(['/', 'completarDatos']);
      }
    }

     makeRandom(lengthOfCode: number, possible: string) {
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
        this.terminal= "Puerta " + text;
        return text;
    }

    filtroClase(clase: number){

      if (clase === 1){
        //ejecutiva
        this.clase = "Ejecutiva";
        
      }else if (clase === 2){
        //primera
        this.clase = "Primera";
      }else{
        //economica
        this.clase = "Economica";
       
      }

    }
    
  

}
