import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/interfaces/interfaces';

import { ClienteService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent {
  formCliente: FormGroup;
  tituloAccion: string = 'Registrar';
  botonAccion: string = 'Registrar';

  constructor(
    private modalActual: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private utilityService: UtilityService) {

      this.formCliente = this.fb.group({
        cedula: ["", Validators.required],
        nombre: ["", Validators.required],
        edad: [0, Validators.required],
        sexo: ["", Validators.required],
        telefono: [0, Validators.required]
      })

      if(data != null){
        this.tituloAccion = 'Editar';
        this.botonAccion = 'Actualizar';
        this.formCliente.patchValue(data);
      }
  }

  ngOnInit(): void {
    if(this.data != null){
      this.formCliente.patchValue({
        cedula: this.data.cedula,
        nombre: this.data.nombre,
        edad: this.data.edad,
        sexo: this.data.sexo,
        telefono: this.data.telefono
      });
    }
  }

  saveorEditCliente(){
    const _cliente : Cliente = {
      cedula: this.formCliente.get('cedula')?.value,
      nombre: this.formCliente.get('nombre')?.value,
      edad: this.formCliente.get('edad')?.value,
      sexo: this.formCliente.get('sexo')?.value,
      telefono: this.formCliente.get('telefono')?.value
    }


    if(this.data == null){
      this.clienteService.guardar(_cliente).subscribe({
        next: (data) => {
          if(data.isSuccess){
            this.utilityService.mostrarAlerta('Cliente registrado correctamente', 'Exito');
            this.modalActual.close(true);
          }else{
            this.utilityService.mostrarAlerta('Error al registrar el cliente', 'Error');
          }
        },
        error: (e) => {}
      })
    }else{
      this.clienteService.actualizar(_cliente).subscribe({
        next: (data) => {
          if(data.isSuccess){
            this.utilityService.mostrarAlerta('Cliente actualizado correctamente', 'Exito');
            this.modalActual.close(true);
          }else{
            this.utilityService.mostrarAlerta('Error al actualizar el cliente', 'Error');
          }
        },
        error: (e) => {}
      })
    }
  }
}
