import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public TodoslosVuelos: any = [];
  private fechaactual = new Date();

  public ruta: any = [];
  public fecha: any = [];
  public aereolinea: any = [];
  public precio: any = [];

  constructor(private VuelosServices: VuelosService, private router: Router) { }

  ngOnInit(): void { 
    this.getTodosLosVuelos(this.getCurrentDateMasCuatro(), 'DO', 'US');

  }


  getTodosLosVuelos(fecha: any, origen: any, destino: any){
    this.VuelosServices.ObtenerTodosLosVuelos(fecha, origen, destino).subscribe((data: {}) => {
       this.TodoslosVuelos = data;
       
       for(let vuelos of this.TodoslosVuelos.Quotes){
        
       }

    });
    
  }

  getCurrentDateMasCuatro(): string{
    let day: any = this.fechaactual.getDate() + 4;
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
