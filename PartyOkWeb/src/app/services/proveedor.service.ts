import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Cotizacion } from '../model/cotizacion';
import { Proveedor } from '../model/proveedor';
import { LoginService } from './login.service';


/**
 * 
 * Servicio que nos proporciona el acceso a endpoint de nuestra apí para proveedores
 */
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private urlEndPoint: string = `http://localhost:8080/api/cotizacion`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  private agregarAuthorizationHeader() {
    let token = this.loginService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getProveedor(id: number): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(this.urlEndPoint + `/proveedor?id=${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  actualizar(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>("http://localhost:8080/api/proveedor/", proveedor)
  }

  /**
   * 
   * Metodo para enviar nuestra imagen al backend
   */
  subirImage(archivo: File, id: any): Observable<any> {
    console.log(archivo)
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post("http://localhost:8080/api/proveedor/uploadImage", formData);
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>("http://localhost:8080/api/proveedor/")
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/proveedor/obtener?id=${id}`)
  }

  findByCategoria(id: number): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`http://localhost:8080/api/proveedor/buscar/categorias?id=${id}`)
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/proveedor/categorias`)
  }

  obtenerMasSolicitados(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/proveedor/top')
  }

}
