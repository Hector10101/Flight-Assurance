import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  public Bundle: any = [];
  public boton: any;
  public usuarioLogueado: any;

  constructor(private router: Router) { 
    console.log(router.url);
  }

  ngOnInit(): void {
   

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
