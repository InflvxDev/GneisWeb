import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {ResponseApi} from 'src/app/interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlApi : string = environment.endpoint +  "Menu/";

  constructor(private http:HttpClient) { }

  lista(id:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista?id=${id}`);
  }
}
