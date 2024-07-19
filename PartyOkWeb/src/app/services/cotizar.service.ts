import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Cotizacion } from '../model/cotizacion';
import { Proveedor } from '../model/proveedor';


/**
 * Servicio para acceder a los endpoint relacionados con las funcionalidades para cotizar
 */
@Injectable({
  providedIn: 'root'
})
export class CotizarService {

    @Output() disparadorProveedor: EventEmitter<any> = new EventEmitter();

    constructor(private httpClient:HttpClient){

    }

    /**
     * Metodo para enviar objeto con una nueva cotizacion creada por el usuario
     */
    cotizar(cotizacion:Cotizacion){
      return this.httpClient.post("http://localhost:8080/api/cotizacion/", cotizacion);
    }
}