import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, Data } from '@angular/router';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-fin-compra',
  templateUrl: './fin-compra.component.html',
  styleUrls: ['./fin-compra.component.css']
})
export class FinCompraComponent implements OnInit {
  public Bundle: any = [];
  public datosUsuario: any = [];
  public pago: any = [];

  public codigovuelo: any;
  public numeroasiento: any;
  public fechasalida: any;
  public fechallegada: any;
  public horasalida: any;
  public horallegada: any;
  public precio: any;
  public nombrecliente: any;
  public telefono: any;
  public apellidocliente: any;
  public terminal: any;
  public clasedevuelo: any;

  public codigodestino: any;
  public nombredestino: any;
  public codigoorigen: any;
  public nombreorigen: any;
  public Asientos: any = [];
  public Factura: any = [];

  public tipo: any;
  public montopagado:any;



  constructor(private router: Router, private authServices: AutenticacionService) { }

  ngOnInit(): void {
    this.Bundle = JSON.parse(localStorage.getItem('VueloElegido') || '{}');
    this.pago = JSON.parse(localStorage.getItem('pago') || '{}');
    this.datosUsuario = JSON.parse(localStorage.getItem('usuario_logueado') || '{}');

    if (this.Bundle.nombreOrigen != null && this.datosUsuario.nombre != null){
      this.terminal = this.Bundle.terminal;
      this.fechasalida = this.Bundle.fechaSalida;
      this.fechallegada = this.Bundle.fechaLlegada;
      this.horasalida = this.Bundle.horaSalida;
      this.horallegada = this.Bundle.horaLlegada;
      this.precio = this.Bundle.precio;
      this.nombrecliente = this.datosUsuario.nombre;
      this.apellidocliente = this.datosUsuario.apellido;
      this.telefono = this.datosUsuario.telefono;

      this.codigoorigen = this.Bundle.codOrigen;
      this.nombreorigen = this.Bundle.nombreOrigen;
      this.codigodestino = this.Bundle.codDestino;
      this.nombredestino = this.Bundle.nombreDestino;
      this.clasedevuelo = this.Bundle.clasedevuelo;

      this.tipo = this.pago.tipo;
      this.montopagado = this.pago.precio;


      let possible = "1234567890";
      const lengthOfCode = 3;
      this.makeRandom(lengthOfCode, possible);
      this.getFactura();
      this.getAsiento();
    /*  localStorage.removeItem('usuario_logueado');
      localStorage.removeItem('nombreUsuario');           //Descomentar despues de terminar de probar
      localStorage.removeItem('VueloElegido');
      localStorage.removeItem('pago');*/

    }
    else{
      this.router.navigate(['/', 'vuelos']);
    }
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      this.codigovuelo= text;
      return text;
  }

  getAsiento(){
    this.authServices.ObtenerAsientos().subscribe((data: {}) => {
        this.Asientos = data;
        /*for(let asientos of this.Asientos){
          for(let factura of this.Factura){
            if(this.clasedevuelo == asientos['codigo_asiento']){
                                                                      //Este codigo no me funciona
              if(factura.asiento != asientos['no_asiento']){
                this.numeroasiento = asientos['no_asiento'];
                break;
              }
            }
          }
        }*/
        console.log(this.Asientos);
        this.numeroasiento = this.Asientos[Math.floor(Math.random() * this.Asientos.length)]['no_asiento'];
       // this.postFactura();  //Descomentar despues de Arreglar
      });
    }

    getFactura(){
      this.authServices.ObtenerFactura().subscribe((data: {}) => {
          this.Factura = data;
        });
      }

    postFactura(){

      const factura = {
        codigo_vuelo: this.codigovuelo,
        asiento: this.numeroasiento,
        nombrecliente: this.nombrecliente,
        telefonocliente: this.telefono,
        fechasalida: this.fechasalida,
        fechaentrada: this.fechallegada,
        horasalida: this.horasalida,
        horaentrada: this.horallegada,
        tipo: '',
        precio: this.precio
  
      }
       this.authServices.PostearFactura(factura).subscribe((registro: {}) => {

       });
    }
      
}
