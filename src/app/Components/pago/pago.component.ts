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
  public montovuelo: any;
  public montominimo: any;
  public newnombretarjeta: any;
  public montorealmitad: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.Bundle = JSON.parse(localStorage.getItem('VueloElegido') || '{}');
    if (this.Bundle.nombreOrigen != null){
     this.montovuelo = this.Bundle.precio;
     const montoreal = this.montovuelo.split('$');
     this.montorealmitad = parseFloat(montoreal[1]) * parseFloat('0.50');
     this.montominimo = this.montorealmitad;
    }
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }


  // tslint:disable-next-line: typedef
  onClickPagar(nombretarjeta: HTMLInputElement, notarjeta: HTMLInputElement, fechavencimiento: HTMLInputElement,
               CCV: HTMLInputElement, montoapagar: HTMLInputElement){

      // tslint:disable-next-line: prefer-const
      let montoreal = this.montovuelo.split('$');
      this.montorealmitad = parseFloat(montoreal[1]) * parseFloat('0.50');

      // tslint:disable-next-line: triple-equals
      if (nombretarjeta.value != '' || notarjeta.value != '' ||
       // tslint:disable-next-line: triple-equals
       fechavencimiento.value != '' ||  CCV.value != '' || montoapagar.value != ''){

        if (parseFloat(montoapagar.value) >= this.montorealmitad && parseFloat(montoreal[1]) >= parseFloat(montoapagar.value) ){
          
          if(parseFloat(montoapagar.value) < parseFloat(montoreal[1])){
            const Reserva = {
              precio: montoapagar.value,
              tipo: "Reserva"
            }
            localStorage.setItem("pago", JSON.stringify(Reserva));
          }else{
            const pago = {
              precio: montoapagar.value,
              tipo: "Compra"
            }
            localStorage.setItem("pago", JSON.stringify(pago));
          }
          
          this.router.navigate(['/', 'finalizarCompra']);
        }else{
          console.log('mensaje EL MINIMO PARA PAGAR ES montorealmitad;');
        }

      }else{

        console.log('Mensaje Completar Todos los campos');
      }
  }
  // tslint:disable-next-line: typedef
  onclickMC(){
    this.newnombretarjeta = 'MasterCard';
  }
  // tslint:disable-next-line: typedef
  onclickVisa(){
    this.newnombretarjeta = 'Visa';
  }

}
