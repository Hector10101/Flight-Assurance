import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ContactanosComponent } from './Components/contactanos/contactanos.component';
import { FinCompraComponent } from './Components/fin-compra/fin-compra.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { NosotrosComponent } from './Components/nosotros/nosotros.component';
import { PagoComponent } from './Components/pago/pago.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { VCompletarDatosComponent } from './Components/v-completar-datos/v-completar-datos.component';
import { VDetallesComponent } from './Components/v-detalles/v-detalles.component';
import { VuelosComponent } from './Components/vuelos/vuelos.component';
import { FacturasComponent } from './Components/facturas/facturas.component';
import { Page404Component } from './Components/page404/page404.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'vuelos', component: VuelosComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'contactanos', component: ContactanosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'detallesvuelo', component: VDetallesComponent},
  {path: 'completarDatos', component: VCompletarDatosComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'finalizarCompra', component: FinCompraComponent},
  {path: 'facturas', component: FacturasComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
