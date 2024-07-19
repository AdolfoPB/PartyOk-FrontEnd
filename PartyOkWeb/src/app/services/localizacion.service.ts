import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para acceder a los endpoint para obtener regiones, provincias y comunas
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  public regiones:any[] =[];

  constructor(private http:HttpClient) {
   }

   obtenerRegiones(){
    return this.http.get<any[]>("http://localhost:8080/api/localizacion/region")
   }
   obtenerProvincias(id:number){
    return this.http.get<any[]>(`http://localhost:8080/api/localizacion/provincia?id=${id}`)
   }
   obtenerComunas(id:number){
    return this.http.get<any[]>(`http://localhost:8080/api/localizacion/comuna?id=${id}`)
   }
}
