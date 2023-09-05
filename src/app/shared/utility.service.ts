import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar:MatSnackBar) { }

  mostrarAlerta(mensaje:string, tipo:string){
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition : "end",
      verticalPosition : "top",
      duration : 5000  
    });
  }

  guardarSesion(sesion:Sesion){
    localStorage.setItem("usuario", JSON.stringify(sesion));
  }

  obtenerSesion(){
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }

  eliminarSesion(){
    localStorage.removeItem("usuario");
  }

}
