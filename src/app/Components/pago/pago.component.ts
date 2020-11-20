import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public Bundle: any = []; 
  public montovuelo:any;
  public newnombretarjeta: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.Bundle = JSON.parse(localStorage.getItem("VueloElegido") || '{}');
    if(this.Bundle.nombreOrigen != null){
     this.montovuelo = this.Bundle.precio;
    }
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }

  onClickPagar(nombretarjeta: HTMLInputElement, notarjeta: HTMLInputElement, fechavencimiento: HTMLInputElement, 
    CCV: HTMLInputElement, montoapagar: HTMLInputElement){
      
      var montoreal = this.montovuelo.split("$");
      let montorealmitad = parseFloat(montoreal[1]) * parseFloat("0.50");

      if(nombretarjeta.value != '' || notarjeta.value != '' || fechavencimiento.value != '' ||  CCV.value != '' || montoapagar.value != ''){
       
        if(parseFloat(montoapagar.value) >= montorealmitad){
          this.router.navigate(['/', 'finalizarCompra']);
        }else{
          console.log("mensaje EL MINIMO PARA PAGAR ES montorealmitad;");
        }

      }else{
        
        console.log("Mensaje Completar Todos los campos");
      }
  }
  onclickMC(){
    this.newnombretarjeta = "MasterCard";
  }
  onclickVisa(){
    this.newnombretarjeta = "Visa";
  }

} 
