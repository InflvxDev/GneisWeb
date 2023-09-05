import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ClienteComponent, DashboardComponent, HabitacionComponent, HistorialReservasComponent, ReporteComponent, ReservaComponent, UsuarioComponent } from './pages/pages';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: 'habitaciones', component: HabitacionComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'reservas', component: ReservaComponent },
    { path: 'historial_reservas', component: HistorialReservasComponent },
    { path: 'reportes', component: ReporteComponent },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
