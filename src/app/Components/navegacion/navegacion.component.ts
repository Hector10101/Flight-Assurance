import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  public ruta: any;
  public Bundle: any = [];
  public boton: any;
  public usuarioLogueado: any;
  
  public inicio: string =""; vuelos: string =""; 
  nosotros: string =""; contactanos: string ="";

  constructor(private router: Router) { 
    this.ruta = router.url;
    console.log(router.url);
    
  }

  ngOnInit(): void {

    if (this.ruta === '/'){
      this.inicio = "active";
    }else if (this.ruta === '/vuelos'){
      this.vuelos = "active";
    }else if (this.ruta === '/nosotros'){
      this.nosotros = "active";
    }else if (this.ruta === '/contactanos'){
      this.contactanos = "active";
    }
    else if (this.ruta === '/detallesvuelo'){
      this.vuelos = "active";
    }
    else if (this.ruta === '/completarDatos'){
      this.vuelos = "active";
    }
    else if (this.ruta === '/pago'){
      this.vuelos = "active";
    }
    else if (this.ruta === '/finalizarCompra'){
      this.vuelos = "active";
    }
    this.Bundle = JSON.parse(localStorage.getItem('usuario_logueado') || '{}');
    if(this.Bundle.nombre != null){
        this.boton = this.Bundle.nombre + ', ' + "Cerrar Sesion";
        this.usuarioLogueado = true;
    }else{
      this.usuarioLogueado = false;
      this.boton = "Iniciar Sesion";
    }
  }

  onclickLogueado(){
    if(this.usuarioLogueado){
      //limpiarstorage confirmar cerrar sesion
      localStorage.removeItem("usuario_logueado");
      this.router.navigate(['/', '']);
    }else{
      this.router.navigate(['/', 'login']);
    }
  }

}
