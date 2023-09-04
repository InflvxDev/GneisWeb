import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {ResponseApi, Reserva} from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlApi : string = environment.endpoint + "Reserva/";

  constructor(private http:HttpClient) { }

  historial(buscarPor:string, idReserva:string, fechaInicio:string, fechaFin:string):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Historia?buscarPor=${buscarPor}&idReserva=${idReserva}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
  
  reporte(fechaInicio:string, fechaFin:string):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  guardar(request: Reserva):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  }

  checkin(request: Reserva):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}CheckIn`, request);
  }
  
  checkout(request: Reserva):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}CheckOut`, request);
  }

}
