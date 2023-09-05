import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/services';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  formLogin:FormGroup;
  verClave:boolean = false;
  loading:boolean = false;

  constructor(
    private fb:FormBuilder, 
    private _usuarioService:UsuarioService, 
    private _utilityService:UtilityService, 
    private router:Router) 
  {
    this.formLogin = this.fb.group({
      correo : ['', Validators.required],
      clave : ['', Validators.required]
    });

  }

  IniciarSession(){
    this.loading = true;
    const request:Login = {
      correo : this.formLogin.get('correo')?.value,
      clave : this.formLogin.get('clave')?.value
    }

    this._usuarioService.iniciarSesion(request).subscribe({
      next: data => {
        if(data.isSuccess){
          this._utilityService.guardarSesion(data.value);
          this.router.navigate(['page']);
        }else{
          this._utilityService.mostrarAlerta('No se encontraron coincidencias en el sistema', 'Opps!');
        }
      },
      complete : () => {
        this.loading = false;
      },
      error: error => {
        this._utilityService.mostrarAlerta('Ocurrio un error al iniciar sesión', 'Opps!');
      }
    });
  }

}
