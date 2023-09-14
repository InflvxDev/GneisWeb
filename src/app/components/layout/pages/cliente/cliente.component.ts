import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalClienteComponent } from '../../modals/modals';
import { Cliente } from '../../../../interfaces/interfaces';
import { ClienteService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements AfterViewInit {
  columnasTabla: String[] = [
    'cedula',
    'nombre',
    'edad',
    'sexo',
    'telefono',
    'acciones',
  ];
  datainicio: Cliente[] = [];
  listaClientes = new MatTableDataSource(this.datainicio);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  )
  {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.lista().subscribe({
      next : (data) => {
        console.log(data);
        if(data.isSuccess){
          this.listaClientes.data = data.value;
        }
        else{
          this.utilityService.mostrarAlerta('No se Encontraron datos', 'Oops!');
        }
      },
      error: (e) => {}
    })
  }

  ngAfterViewInit() {
    this.listaClientes.paginator = this.paginator;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.listaClientes.filter = filterValue.trim().toLowerCase();
  }

  nuevoCliente(){
    this.dialog.open(ModalClienteComponent, {
      disableClose: true,
    }).afterClosed().subscribe(result =>{
      if(result === true){
        this.obtenerClientes();
      }
    });
    
  }

  editarCliente(cliente: Cliente){
    this.dialog.open(ModalClienteComponent, {
      disableClose: true,
      data: cliente
    }).afterClosed().subscribe(result =>{
      if(result === true){
        this.obtenerClientes();
      }
    });
  }

  eliminarCliente(cliente: Cliente){
    Swal.fire({
      title: '¿Está seguro de eliminar el cliente?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00897b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminar(parseInt(cliente.cedula)).subscribe({
          next: (data) => {
            if(data.isSuccess){
              this.utilityService.mostrarAlerta('Cliente eliminado correctamente', 'success');
              this.obtenerClientes();
            }
            else{
              this.utilityService.mostrarAlerta('No se pudo eliminar el cliente', 'error');
            }
          },
          error: (e) => {}
        });
      }
    })
  }

}
