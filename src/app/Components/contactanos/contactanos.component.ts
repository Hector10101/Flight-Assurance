import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {


  public Nombre:any;
  public Correo: any;
  public Asunto: any;
  public Mensaje: any;
  constructor(public _MessageService: MensajeService) { }

  ngOnInit(): void {
  } 

  onClickEnviar(nombre: HTMLInputElement,correo: HTMLInputElement,asunto: HTMLInputElement,mensaje: HTMLTextAreaElement){
    
    if(nombre.value == '' || correo.value == '' || asunto.value == '' || mensaje.value == ''){}
    else{
    const form = {
      nombre: nombre.value,
      email: correo.value,
      mensaje: mensaje.value,
      asunto: asunto.value
    };

    this._MessageService.sendMessage(form).subscribe(() => {
      
      swal.fire('Mensaje Enviado','Gracias por comunicarnos', 'success');
      this.Nombre="";
      this.Asunto="";
      this.Correo="";
      this.Mensaje="";
      },error =>{
        swal.fire('Mensaje no Enviado',':(', 'error');
      });
   }
}

 

}
