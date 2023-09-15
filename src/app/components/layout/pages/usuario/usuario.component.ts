import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../modals/modals';
import { Usuario } from '../../../../interfaces/interfaces';
import { UsuarioService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements AfterViewInit {
  columnasTabla: String[] = [
    'id',
    'nombre',
    'correo',
    'descripcionRol',
    'estado',
    'acciones',
  ];
  datainicio: Usuario[] = [];
  listaUsuarios = new MatTableDataSource(this.datainicio);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.lista().subscribe({
      next : (data) => {
        if(data.isSuccess){
          data.value.sort((a: any, b: any) => a.id - b.id);
          this.listaUsuarios.data = data.value;
        }
        else{
          this.utilityService.mostrarAlerta('No se Encontraron datos', 'Oops!');
        }
      },
      error: (e) => {}
    });
  }

  
  ngAfterViewInit() {
    this.listaUsuarios.paginator = this.paginator;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.listaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  

  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
    }).afterClosed().subscribe(result =>{
      if(result === 'true'){
        this.obtenerUsuarios();
      }
    });
  }
  
  EditarUsuario(usuario: Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result =>{
      if(result === 'true'){
        this.obtenerUsuarios();
      }
    });
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      confirmButtonColor: '#00897b',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.usuarioService.eliminar(usuario.id).subscribe({
          next : (data) => {
            if(data.isSuccess){
              this.utilityService.mostrarAlerta('Usuario eliminado correctamente', 'Exito');
              this.obtenerUsuarios();
            }else{
              this.utilityService.mostrarAlerta('Error al eliminar el usuario', 'Error');
            }
          },
          error: (e) => {}
        });
      }
    })
  }
}
