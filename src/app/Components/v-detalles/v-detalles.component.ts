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

   public codorigen: any;
   public coddestino: any;

   private Bundle: any =[];
   public listado: any = [];


  constructor(private VuelosServices: VuelosService, private router: Router) {
    this.getListadodePaises();
   }

  ngOnInit(): void {
   this.Bundle =  JSON.parse(localStorage.getItem("VueloElegido") || '{}');
    if(this.Bundle.nombreOrigen != null){
      this.fecha = this.Bundle.fecha;
      this.aereolinea = this.Bundle.aereolinea;
      this.precio = this.Bundle.precio;
      this.origen = this.Bundle.nombreOrigen;
      this.destino = this.Bundle.nombreDestino;
      this.codorigen = this.Bundle.codOrigen;
      this.coddestino = this.Bundle.codDestino;
      this.fechasalida = this.Bundle.fechaSalida;
      this.fechallegada = this.Bundle.fechaLlegada;
    }else{
      this.router.navigate(['/', 'vuelos']);
    }

    console.log(this.Bundle.nombreOrigen);
  }


  getListadodePaises(){
    this.VuelosServices.ObtenerNombredePaises().subscribe((data: {}) => {
        this.listado = data;
      });
    }

    onclickCompletarDatos(){
      if(this.origen != null){
        this.router.navigate(['/', 'completarDatos']);
      }
    }
 
}
