import { Component, Inject} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol, Usuario } from 'src/app/interfaces/interfaces';

import { RolService, UsuarioService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';


@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent {
  formUsuario: FormGroup;
  verClave: boolean = false;
  tituloAccion: string = 'Registrar';
  botonAccion: string = 'Registrar';
  listaRoles : Rol[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private utilityService: UtilityService) {
      this.formUsuario = this.fb.group({
        nombre: ["", Validators.required],
        correo: ["", Validators.required],
        idRol: ["", Validators.required],
        clave: ["", Validators.required],
        esActivo: ["1", Validators.required]

      });
      
      if(data != null){
        this.tituloAccion = 'Editar';
        this.botonAccion = 'Actualizar';
        this.formUsuario.patchValue(data);
      }

      this.rolService.lista().subscribe({
        next : (data) => {
          if(data.isSuccess){
            this.listaRoles = data.value;
          }
        },
        error: (e) => {}
      });
    }

    ngOnInit(): void {
      if(this.data != null){
        this.formUsuario.patchValue({
          nombre: this.data.nombre,
          correo: this.data.correo,
          idRol: this.data.idRol,
          clave: this.data.clave,
          esActivo: this.data.esActivo.toString()
        });
      }
    }

    saveorEditUsuario(){
      const _usuario : Usuario = {
        id : this.data != null ? this.data.id : 0,
        nombre : this.formUsuario.get('nombre')?.value,
        correo : this.formUsuario.get('correo')?.value,
        idRol : this.formUsuario.get('idRol')?.value,
        descripcionRol : '',
        clave : this.formUsuario.get('clave')?.value,
        esActivo : parseInt(this.formUsuario.get('esActivo')?.value)
      }

      if(this.data == null){
        this.usuarioService.guardar(_usuario).subscribe({
          next : (data) => {
            if(data.isSuccess){
              this.utilityService.mostrarAlerta('Usuario registrado correctamente', 'Exito');
              this.modalActual.close("true");
            }else{
              this.utilityService.mostrarAlerta('Error al registrar el usuario', 'Error');
            }
          },
          error: (e) => {}
        });
      }else{
        this.usuarioService.actualizar(_usuario).subscribe({
          next : (data) => {
            if(data.isSuccess){
              this.utilityService.mostrarAlerta('Usuario actualizado correctamente', 'Exito');
              this.modalActual.close("true");
            }else{
              this.utilityService.mostrarAlerta('Error al actualizar el usuario', 'Error');
            }
          },
          error: (e) => {}
        });
      }
    }

}

