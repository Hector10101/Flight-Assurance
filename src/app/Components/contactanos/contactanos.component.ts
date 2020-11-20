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

    const form = {
      nombre: "Erick",
      email: "erickkpsanchez@gmail.com",
      mensaje: "hora soy naruto"
    };

    this._MessageService.sendMessage(form).subscribe(() => {
      });
   
  } 

 

}
