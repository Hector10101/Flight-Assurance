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
  public montominimo:any;
  public newnombretarjeta: any;
  public montorealmitad: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.Bundle = JSON.parse(localStorage.getItem("VueloElegido") || '{}');
    if(this.Bundle.nombreOrigen != null){
     this.montovuelo = this.Bundle.precio;
     var montoreal = this.montovuelo.split("$");
      this.montorealmitad = parseFloat(montoreal[1]) * parseFloat("0.50");
     this.montominimo = this.montorealmitad;
    }
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }

  
  onClickPagar(nombretarjeta: HTMLInputElement, notarjeta: HTMLInputElement, fechavencimiento: HTMLInputElement, 
    CCV: HTMLInputElement, montoapagar: HTMLInputElement){
      
      var montoreal = this.montovuelo.split("$");
      this.montorealmitad = parseFloat(montoreal[1]) * parseFloat("0.50");
      

      if(nombretarjeta.value != '' || notarjeta.value != '' || fechavencimiento.value != '' ||  CCV.value != '' || montoapagar.value != ''){
       
        if(parseFloat(montoapagar.value) >= this.montorealmitad && parseFloat(montoreal[1]) > parseFloat(montoapagar.value) ){
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
