import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {


  public Nombre: string | undefined;
  public Correo: string | undefined;
  public Asunto: string | undefined;
  public Mensaje: string | undefined;
  public Bundle: any = [];
  // tslint:disable-next-line: variable-name
  constructor(public _MessageService: MensajeService, private router: Router) { }

  ngOnInit(): void {
    this.Bundle =  JSON.parse(localStorage.getItem('usuario_logueado') || '{}');
    if (this.Bundle.nivelacceso !== 'administrador'){
      this.router.navigate(['/', 'contactanos']);
    }else{
      this.router.navigate(['/', 'facturas']);
    }
  }

  // tslint:disable-next-line: typedef
  onClickEnviar(txtnombre: HTMLInputElement, txtcorreo: HTMLInputElement,
                txtasunto: HTMLInputElement, txtmensaje: HTMLTextAreaElement){
    // tslint:disable-next-line: triple-equals
      if (txtnombre.value == '' || txtcorreo.value == '' || txtasunto.value == '' || txtmensaje.value == ''){
        swal.fire({
          title: '¡Debes completar los campos!',
        });
      }else{
        const form = {
          nombre: txtnombre.value,
          email: txtcorreo.value,
          mensaje: txtmensaje.value,
          asunto: txtasunto.value
        };

        this._MessageService.sendMessage(form).subscribe(() => {
        this.Nombre = '';
        this.Asunto = '';
        this.Correo = '';
        this.Mensaje = '';
        swal.fire('Mensaje Enviado', 'Gracias por comunicarnos', 'success');
        this.router.navigate(['']);
      // tslint:disable-next-line: variable-name
      }, _error => {
          swal.fire('El mensaje no pudo ser enviado', ':(', 'error');
        });
    }
  }



}
