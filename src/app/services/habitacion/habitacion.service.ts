import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {ResponseApi, Habitacion} from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private urlApi : string = environment.endpoint +  "Habitacion/";

  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }

  guardar(request: Habitacion):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  }

  actualizar(request: Habitacion):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}Actualizar`, request);
  }

  eliminar(id: number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }
}
