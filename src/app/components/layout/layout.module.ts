import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent, UsuarioComponent, HabitacionComponent, ReservaComponent, HistorialReservasComponent, ReporteComponent, ClienteComponent } from './pages/pages';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    HabitacionComponent,
    ReservaComponent,
    HistorialReservasComponent,
    ReporteComponent,
    ClienteComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }