import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './Components/navegacion/navegacion.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { VuelosComponent } from './Components/vuelos/vuelos.component';
import { NosotrosComponent } from './Components/nosotros/nosotros.component';
import { ContactanosComponent } from './Components/contactanos/contactanos.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { FooterComponent } from './Components/footer/footer.component';
import { VCompletarDatosComponent } from './Components/v-completar-datos/v-completar-datos.component';
import { PagoComponent } from './Components/pago/pago.component';
import { FinCompraComponent } from './Components/fin-compra/fin-compra.component';
import { VDetallesComponent } from './Components/v-detalles/v-detalles.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioComponent,
    VuelosComponent,
    NosotrosComponent,
    ContactanosComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    VCompletarDatosComponent,
    PagoComponent,
    FinCompraComponent,
    VDetallesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
