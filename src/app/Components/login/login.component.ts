import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router } from '@angular/router';

import {AutenticacionService} from 'src/app/servicios/autenticacion.service';
import { authuser } from 'src/app/modelo/authuser.models';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public Cliente: any = [];
  public Administrador: any = [];
  public Bundle: any = [];

  constructor(private ApiService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    this.getCliente();
    this.getAdministrador();
    this.Bundle =  JSON.parse(localStorage.getItem('usuario_logueado') || '{}');
    if (this.Bundle.nivelacceso !== 'administrador'){
      this.router.navigate(['/', 'login']);
    }else{
      this.router.navigate(['/', 'facturas']);
    }
  }

  // tslint:disable-next-line: typedef
  getCliente(){
    this.ApiService.ObtenerClientes().subscribe((data: {}) => {
        this.Cliente = data;
        console.log(this.Cliente);
      });
    }

    // tslint:disable-next-line: typedef
    getAdministrador(){
      this.ApiService.ObtenerAdministrador().subscribe((data: {}) => {
          this.Administrador = data;
          console.log(this.Administrador);
        });
      }

    // tslint:disable-next-line: typedef
    Loguearse(usuario: HTMLInputElement, password: HTMLInputElement){
     for (const cliente of this.Cliente){
        // tslint:disable-next-line: triple-equals
        if ((usuario.value == cliente.usuario) && (password.value == cliente.password)){
         // console.log("cliente encontrado");
         const userAutenticado: authuser = {id: cliente.id, nombre: cliente.nombre, segundonombre: '', apellido: cliente.apellido,
         cedula: cliente.cedula, pasaporte: cliente.pasaporte, fechadenacimiento: cliente.fecha_nacimiento, email: cliente.email,
         telefono: cliente.telefono, direccion: cliente.direccion, nivelacceso: 'cliente'};
         this.ApiService.UsuarioLogueado(userAutenticado);
         localStorage.setItem('nombreUsuario', cliente.nombre);

         this.router.navigate(['/', '/']);

         swal.fire({
            position: 'top-end',
            icon: 'success',
            title: cliente.usuario + '\n' + '¡Estas de regreso!',
            showConfirmButton: false,
            timer: 1500
          });

        }
      }
     for (const administrador of this.Administrador){
        // tslint:disable-next-line: triple-equals
        if ((usuario.value == administrador.usuario) && (password.value == administrador.password)){
          const userAutenticado: authuser = {id: administrador.id, nombre: administrador.nombre,
            segundonombre: '', apellido: administrador.apellido,
            cedula: administrador.cedula, pasaporte: administrador.pasaporte,
            fechadenacimiento: administrador.fecha_nacimiento, email: administrador.email,
            telefono: administrador.telefono, direccion: administrador.direccion, nivelacceso: 'administrador'};
          this.ApiService.UsuarioLogueado(userAutenticado);
          localStorage.setItem('nombreUsuario', administrador.nombre);
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: administrador.usuario + '\n' + '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/', 'facturas']);
        }else{
          console.log('no hay encontrado');
        }
      }
    }

}
