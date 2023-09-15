import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoHabitacion, Habitacion } from 'src/app/interfaces/interfaces';

import { TipoHabitacionService, HabitacionService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-modal-habitacion',
  templateUrl: './modal-habitacion.component.html',
  styleUrls: ['./modal-habitacion.component.css']
})
export class ModalHabitacionComponent {

  formHabitacion: FormGroup;
  tituloAccion: string = 'Registrar';
  botonAccion: string = 'Registrar';
  listatipos : TipoHabitacion[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalHabitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Habitacion,
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private tipoHabitacionService: TipoHabitacionService,
    private utilityService: UtilityService) 
  {
    this.formHabitacion = this.fb.group({
      descripcion: ["", Validators.required],
      idTipo: ["", Validators.required],
      precio: ["", Validators.required],
      usos: [0, Validators.required]
    })

    if(data != null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.formHabitacion.patchValue(data);
    }

    this.tipoHabitacionService.lista().subscribe({
      next : (data) => {
        if(data.isSuccess){
          this.listatipos = data.value;
        }
      },
      error: (e) => {}
    });
  }

  ngOnInit(): void {
    if(this.data != null){
      this.formHabitacion.patchValue({
        descripcion: this.data.descripcion,
        idTipo: this.data.idTipo,
        precio: this.data.precio,
        usos: this.data.usos
      });
    }
  }

  saveorEditHabitacion(){
    const _habitacion : Habitacion = {
      id : this.data != null ? this.data.id : 0,
      descripcion: this.formHabitacion.get('descripcion')?.value,
      idTipo: this.formHabitacion.get('idTipo')?.value,
      descripcionTipo: '',
      precio: this.formHabitacion.get('precio')?.value,
      disponibilidad: true,
      usos: this.formHabitacion.get('usos')?.value
    }

    if(this.data == null){
      this.habitacionService.guardar(_habitacion).subscribe({
        next: (data) => {
          if(data.isSuccess){
            this.utilityService.mostrarAlerta('Habitacion registrada correctamente', 'Exito');
            this.modalActual.close("true");
          }else{
            this.utilityService.mostrarAlerta('Error al registrar la habitacion', 'Error');
          }
        },
        error: (e) => {}
      });
    }else{
      this.habitacionService.actualizar(_habitacion).subscribe({
        next: (data) => {
          if(data.isSuccess){
            this.utilityService.mostrarAlerta('Habitacion actualizada correctamente', 'Exito');
            this.modalActual.close("true");
          }else{
            this.utilityService.mostrarAlerta('Error al actualizar la habitacion', 'Error');
          }
        },
        error: (e) => {}
      });
    }
  }


}
