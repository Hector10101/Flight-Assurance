import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import swal from 'sweetalert2';
import { AutenticacionService} from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  public Factura: any = [];
  public noVuelo: number | undefined;
  // tslint:disable-next-line: variable-name
  public codigo_vuelo: number | undefined;
  public asiento: string | undefined;
  public nombrecliente: string | undefined;
  public telefonocliente: string | undefined;
  public fechasalida: string | undefined;
  public fechaentrada: string | undefined;
  public horasalida: string | undefined;
  public horaentrada: string | undefined;
  public tipo: string | undefined;
  public precio: string | undefined;

  public ArregloFiltroFactura: any = [];
  public tipoFactura: any;
  public i: any;


  public ruta: any;
  public Bundle: any = [];
  public nombre: any;
  public boton: any;
  public usuarioLogueado: any;

  constructor(private factura: AutenticacionService, private router: Router) {

  }

  ngOnInit(): void {
    this.getFactura(this.tipoFactura);

    this.Bundle = JSON.parse(localStorage.getItem('usuario_logueado') || '{}');

    this.nombre = localStorage.getItem('nombreUsuario');
    // tslint:disable-next-line: triple-equals
    if (this.Bundle.nombre != null && this.Bundle.nombre == this.nombre){
        this.boton = this.Bundle.nombre + ', ' + 'Cerrar Sesion';
        this.usuarioLogueado = true;
      // tslint:disable-next-line: triple-equals
      }else if (this.Bundle.nombre == null || this.Bundle.nombre != this.nombre){
        this.usuarioLogueado = false;
        this.boton = 'Iniciar Sesion';
      }
  }


  // tslint:disable-next-line: typedef
  getFactura(TipoFactura: any){
    this.factura.ObtenerFactura().subscribe((data: {}) => {
        this.Factura = data;
        this.i = 0;

        if (TipoFactura === ''){
            this.Factura = data;
            console.log(this.Factura);
        }else if (TipoFactura === 'Reserva'){
          for (const factura of this.Factura){
            if (TipoFactura === factura.tipo){
              this.ArregloFiltroFactura[this.i] = factura;
              this.i++;
            }
          }
          this.Factura = this.ArregloFiltroFactura;
        }else if (TipoFactura === 'Compra'){
          for (const factura of this.Factura){
            if (TipoFactura === factura.tipo){
              this.ArregloFiltroFactura[this.i] = factura;
              this.i++;
            }
          }
          this.Factura = this.ArregloFiltroFactura;
        }
        console.log(this.ArregloFiltroFactura);
      });
    }

  // tslint:disable-next-line: typedef
  getfiltroFactura(escala: number){
    // console.log(escala);
    if (escala === 0){
      this.tipoFactura = '';
      console.log(this.tipoFactura);
    }else if (escala === 1){
      this.tipoFactura = 'Reserva';
      console.log(this.tipoFactura);
    }else{
      this.tipoFactura = 'Compra';
      console.log(this.tipoFactura);
    }
    this.getFactura(this.tipoFactura);
  }

// tslint:disable-next-line: typedef
onclickLogueado(){
  if (this.usuarioLogueado){
    swal.fire({
      title: '¿Está seguro que quiere salir?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesion cerrada' + '\n' + '¡Nos vemos pronto!',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.removeItem('usuario_logueado');
        localStorage.removeItem('nombreUsuario');
        this.usuarioLogueado = false;
        this.router.navigate(['/', 'login']);
      }
    });


  }else{
    this.router.navigate(['/', 'login']);
  }
}


}
