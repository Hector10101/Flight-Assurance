import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { LolComponent } from './Components/lol/lol.component';

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
    LolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
