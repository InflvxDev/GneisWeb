import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent, UsuarioComponent, HabitacionComponent, ReservaComponent, HistorialReservasComponent, ReporteComponent, ClienteComponent } from './pages/pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalUsuarioComponent, ModalClienteComponent, ModalHabitacionComponent } from './modals/modals';






@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    HabitacionComponent,
    ReservaComponent,
    HistorialReservasComponent,
    ReporteComponent,
    ClienteComponent,
    ModalUsuarioComponent,
    ModalClienteComponent,
    ModalHabitacionComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }
