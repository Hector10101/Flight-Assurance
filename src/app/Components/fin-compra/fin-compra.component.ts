import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-fin-compra',
  templateUrl: './fin-compra.component.html',
  styleUrls: ['./fin-compra.component.css']
})
export class FinCompraComponent implements OnInit {
  public Bundle: any = []; 
  public datosUsuario: any = [];

  public codigovuelo:any;
  public numeroasiento: any;
  public fechasalida:any;
  public fechallegada:any;
  public horasalida:any;
  public horallegada:any;
  public precio: any;
  public nombrecliente: any;
  public telefono: any;
  public apellidocliente: any;
  public terminal: any;

  public codigodestino: any;
  public nombredestino: any;
  public codigoorigen: any;
  public nombreorigen: any;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Bundle = JSON.parse(localStorage.getItem("VueloElegido") || '{}');
    this.datosUsuario = JSON.parse(localStorage.getItem("usuario_logueado") || '{}');
    if(this.Bundle.nombreOrigen != null && this.datosUsuario.nombre != null){

      this.codigovuelo = "200";
      this.numeroasiento = "45B";
      this.terminal = "Puerta A";
      this.fechasalida = this.Bundle.fechaSalida;
      this.fechallegada = this.Bundle.fechaLlegada;
      this.horasalida = this.Bundle.horaSalida;
      this.horallegada = this.Bundle.horaLlegada;
      this.precio = this.Bundle.precio;
      this.nombrecliente = this.datosUsuario.nombre;
      this.apellidocliente = this.datosUsuario.apellido;
      this.telefono = this.datosUsuario.telefono;

      this.codigoorigen = this.Bundle.codOrigen;
      this.nombreorigen= this.Bundle.nombreOrigen;
      this.codigodestino = this.Bundle.codDestino;
      this.nombredestino = this.Bundle.nombreDestino;

      localStorage.removeItem("user_logueado");
      localStorage.removeItem("nombreUsuario");
      
    }
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }

} 
