import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  public Bundle: any = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Bundle =  JSON.parse(localStorage.getItem('usuario_logueado') || '{}');
    if (this.Bundle.nivelacceso !== 'administrador'){
      this.router.navigate(['/', 'nosotros']);
    }else{
      this.router.navigate(['/', 'facturas']);
    }
  }

}
