import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalHabitacionComponent } from '../../modals/modals';
import { Habitacion } from '../../../../interfaces/interfaces';
import { HabitacionService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements AfterViewInit {
  columnasTabla: String[] = [
    'id',
    'descripcion',
    'descripcionTipo',
    'precio',
    'disponibilidad',
    'usos',
    'acciones',
  ];
  datainicio: Habitacion[] = [];
  listaHabitaciones = new MatTableDataSource(this.datainicio);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private habitacionService: HabitacionService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ){
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    this.habitacionService.lista().subscribe({
      next : (data) => {
        if(data.isSuccess){

          data.value.sort((a: any, b: any) => a.id - b.id);
          this.listaHabitaciones.data = data.value;
          
        }
        else{
          this.utilityService.mostrarAlerta('No se Encontraron datos', 'Oops!');
        }
      },
      error: (e) => {}
    });
  }

  ngAfterViewInit() {
    this.listaHabitaciones.paginator = this.paginator;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.listaHabitaciones.filter = filterValue.trim().toLowerCase();
  }

  nuevaHabitacion(){
    this.dialog.open(ModalHabitacionComponent, {
      disableClose: true,
    }).afterClosed().subscribe(result =>{
      if(result === 'true'){
        this.obtenerHabitaciones();
      }
    });
  }

  EditarHabitacion(habitacion: Habitacion){
    this.dialog.open(ModalHabitacionComponent, {
      disableClose: true,
      data: habitacion
    }).afterClosed().subscribe(result =>{
      if(result === 'true'){
        this.obtenerHabitaciones();
      }
    });
  }

  eliminarHabitacion(habitacion: Habitacion){
    Swal.fire({
      title: '¿Está seguro de eliminar la Habitacion?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      confirmButtonColor: '#00897b',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.habitacionService.eliminar(habitacion.id).subscribe({
          next : (data) => {
            if(data.isSuccess){
              this.utilityService.mostrarAlerta('Habitacion eliminada correctamente', 'Exito');
              this.obtenerHabitaciones();
            }else{
              this.utilityService.mostrarAlerta('Error al eliminar la Habitacion', 'Error');
            }
          },
          error: (e) => {}
        });
      }
    })
  }
}
