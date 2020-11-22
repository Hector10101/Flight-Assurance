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
   public clase = 'economica';
   public precioClase: any;
   public cantidadClase: any;

   public codorigen: any;
   public coddestino: any;

   private Bundle: any = [];
   private Bundle2: any = [];
   public listado: any = [];
   public terminal: any;

  constructor(private VuelosServices: VuelosService, private router: Router) {
    this.getListadodePaises();
   }

  ngOnInit(): void {
   this.Bundle =  JSON.parse(localStorage.getItem('VueloElegido') || '{}');
   this.Bundle2 =  JSON.parse(localStorage.getItem('usuario_logueado') || '{}');
   if (this.Bundle2.nivelacceso !== 'administrador'){
    this.router.navigate(['/', 'detallesvuelo']);
    }else{
      this.router.navigate(['/', 'facturas']);
    }
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
      this.horallegada = this.Bundle.horaLlegada;
      this.horasalida = this.Bundle.horaSalida;
      this.precioClase = this.Bundle.precio.split('$');
      this.precio = '$' + this.precioClase[1];
      const possible = 'A1B2C3D4';
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

     // tslint:disable-next-line: typedef
     makeRandom(lengthOfCode: number, possible: string) {
      let text = '';
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      this.terminal = 'Puerta ' + text;
      return text;
    }

    // tslint:disable-next-line: typedef
    filtroClase(clase: number){

      if (clase === 1){
        // ejecutiva

        console.log(this.precio);
        this.precio =  this.precioClase[1];
        // tslint:disable-next-line: radix
        this.cantidadClase = parseInt(this.precio) + 35;
        this.precio = '$' + this.cantidadClase;
        this.clase = 'Ejecutiva';

      }else if (clase === 2){
        this.precio =  this.precioClase[1];
        // primera
        // tslint:disable-next-line: radix
        this.cantidadClase = parseInt(this.precio) + 65;
        this.precio =  '$' + this.cantidadClase;
        this.clase = 'Primera';
      }else{
        this.precio = '$' + this.precioClase[1];
        // economica
        this.clase = 'Economica';
      }
    }

    // tslint:disable-next-line: typedef
    goBack(){
      localStorage.removeItem('VueloElegido');
    }

}
