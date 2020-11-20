import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {


  constructor(public _MessageService: MensajeService) { }

  ngOnInit(): void {
  } 

  onClickEnviar(nombre: HTMLInputElement,correo: HTMLInputElement,asunto: HTMLInputElement,mensaje: HTMLTextAreaElement){
    const form = {
      nombre: nombre.value,
      email: correo.value,
      mensaje: mensaje.value,
      asunto: asunto.value
    };

    this._MessageService.sendMessage(form).subscribe(() => {
      });
   
  }

 

}
