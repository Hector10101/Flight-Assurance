import { Component, OnInit } from '@angular/core';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service'
import {RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private AutenticacionServices: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
  }

  PostearCliente(nombre: HTMLInputElement,apellido: HTMLInputElement,cedula: HTMLInputElement,pasaporte: HTMLInputElement,email: HTMLInputElement,nombreusuario: HTMLInputElement,password: HTMLInputElement, telefono: HTMLInputElement) {
    const cliente = {
      cedula: cedula.value,
      pasaporte: pasaporte.value,
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      telefono: telefono.value,
      direccion: "",
      genero: "",
      fecha_nacimiento: "",
      usuario: nombreusuario.value,
      password: password.value

    };
    this.AutenticacionServices.PostearCliente(cliente).subscribe((registro: {}) => {
      this.router.navigate(['/', 'login']);
    },error =>{
      //Mensaje de Error
    });
  }
}
