import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router } from '@angular/router';

import {AutenticacionService} from 'src/app/servicios/autenticacion.service';
import { authuser } from 'src/app/modelo/authuser.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public Cliente: any=[]; 
  public Administrador: any =[];


  constructor(private ApiService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    this.getCliente();
    this.getAdministrador();
  }


  getCliente(){
    this.ApiService.ObtenerClientes().subscribe((data: {}) => {
        this.Cliente = data;
        console.log(this.Cliente);
      })
    }

    getAdministrador(){
      this.ApiService.ObtenerAdministrador().subscribe((data: {}) => {
          this.Administrador = data;
          console.log(this.Administrador);
        })
      }

    Loguearse(usuario: HTMLInputElement, password: HTMLInputElement){
     for(let cliente of this.Cliente){
        if((usuario.value == cliente["usuario"]) && (password.value == cliente["password"])){
         // console.log("cliente encontrado");
         let userAutenticado : authuser = {id:cliente["id"], nombre:cliente["nombre"], nivelacceso: "cliente"};
         this.ApiService.UsuarioLogueado(userAutenticado);
         this.router.navigate(['/', '']);
        }
      }
      for(let administrador of this.Administrador){
        if((usuario.value == administrador["usuario"]) && (password.value == administrador["password"])){
          //console.log("administrador encontrado");
          let userAutenticado : authuser = {id:administrador["id"], nombre:administrador["nombre"], nivelacceso: "administrador"};
          this.ApiService.UsuarioLogueado(userAutenticado);
          this.router.navigate(['/', '']);
        }else{
          console.log("no hay encontrado");
        }
      }
    }

}
