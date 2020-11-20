import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  public ruta: any;
  public Bundle: any = [];
  public nombre: any;
  public boton: any;
  public usuarioLogueado: any;
  
  public inicio: string =""; vuelos: string =""; 
  nosotros: string =""; contactanos: string ="";

  constructor(private authService: AutenticacionService,private router: Router) { 
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

    this.nombre = localStorage.getItem("nombreUsuario");
      if(this.Bundle.nombre != null && this.Bundle.nombre ==this.nombre){
        this.boton = this.Bundle.nombre + ', ' + "Cerrar Sesion";
        this.usuarioLogueado = true;
      }else if(this.Bundle.nombre == null || this.Bundle.nombre != this.nombre){
        this.usuarioLogueado = false;
        this.boton = "Iniciar Sesion";
      }
    
  }



  onclickLogueado(){
    if(this.usuarioLogueado){
      localStorage.removeItem("usuario_logueado");
      localStorage.removeItem("nombreUsuario");
      this.usuarioLogueado = false;
      this.router.navigate(['/', 'login']);
    }else{
      this.router.navigate(['/', 'login']);
    }
  }

}
