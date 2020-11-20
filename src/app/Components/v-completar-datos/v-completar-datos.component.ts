import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-v-completar-datos',
  templateUrl: './v-completar-datos.component.html',
  styleUrls: ['./v-completar-datos.component.css']
})
export class VCompletarDatosComponent implements OnInit {

  public primernombre: any;
  public segundonombre: any;
  public apellido: any;
  public cedula: any;
  public pasaporte: any;
  public fechadenacimiento: any;
  public email: any;
  public telefono: any;
  public direccion: any;

  public id =0;
  public nivelacceso="";
  public Bundle: any = [];

  constructor(private VuelosServices: VuelosService,private Autenticacion: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    this.Bundle = JSON.parse(localStorage.getItem("usuario_logueado") || '{}');
    if(this.Bundle.nombre != null){
      this.id= this.Bundle.id;
      this.nivelacceso= this.Bundle.nivelacceso;
      this.primernombre = this.Bundle.nombre;
      this.apellido = this.Bundle.apellido;
      this.cedula = this.Bundle.cedula;
      this.pasaporte = this.Bundle.pasaporte;
      this.fechadenacimiento = this.Bundle.fechadenacimiento;
      this.email = this.Bundle.email;
      this.telefono= this.Bundle.telefono;
      this.direccion = this.Bundle.direccion;
      this.segundonombre = this.Bundle.segundonombre;
    }
    


  }


  onClickCompletarDatos(newprimernombre: HTMLInputElement,newsegundonombre: HTMLInputElement,newapellido: HTMLInputElement,
    newcedula: HTMLInputElement,newpasaporte: HTMLInputElement,newfechanac: HTMLInputElement,newemail: HTMLInputElement,
    newtelefono: HTMLInputElement, newdireccion: HTMLInputElement){

      console.log(newcedula.value);
      if(newprimernombre.value == '' || newapellido.value == '' || newcedula.value == '' 
        || newpasaporte.value == '' || newfechanac.value == '' || newemail.value == '' 
        || newtelefono.value == '' || newdireccion.value == ''){

          //mensaje de llenar campos
          console.log("llene los campos");
        }else{

          const usuarioComprando = {
            id: this.id,
            nombre: newprimernombre.value,
            segundonombre: newsegundonombre.value,
            apellido: newapellido.value,
            cedula: newcedula.value,
            pasaporte: newpasaporte.value,
            fechadenacimiento: newfechanac.value,
            email: newemail.value,
            telefono: newtelefono.value,
            direccion: newdireccion.value,
            nivelacceso: this.nivelacceso
          };
          this.Autenticacion.UsuarioLogueado(usuarioComprando);
          this.router.navigate(['/', 'pago']);



        }

  }
}
