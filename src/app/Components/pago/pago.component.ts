import { Component, OnInit } from '@angular/core';
import {VuelosService} from 'src/app/servicios/vuelos.service';
import {RouterModule, Routes, Router, Data } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public Bundle: any = []; //😀😀Te odio care culo😀😀
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.Bundle = JSON.parse(localStorage.getItem("VueloElegido") || '{}');
    if(this.Bundle.nombreOrigen != null){}
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }

}
