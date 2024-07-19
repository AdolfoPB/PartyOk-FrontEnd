import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Proveedor } from '../model/proveedor';
import { Usuario } from '../model/usuario';


/**
 * Servicio que alamacena todas las funcionalidades relacionadas con el login de la aplicacion
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private _usuario: Usuario | undefined; 
  private _proveedor: Proveedor = new Proveedor();
  private _token: string | undefined;

  constructor(private router:Router, private http:HttpClient) {
    
   }
   
   /**
    * Metodo que obtiene al usuario que tiene la sesion iniciada desde el sessionStorage del navegador
    */
   public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
 /**
    * Metodo que obtiene el token de la sesion iniciada desde el sessionStorage del navegador
    */
  public get token(): string | null{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null;
  }

  /**
   * Metodo para enviar nuestras credenciales al backend para que el usuario pueda iniciar sesion
   */
   login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.correo);
    params.set('password', usuario.contrasena);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }


  /**
   * 
   * @param accessToken 
   * 
   * Guardamos la informacion del usuario que inicio sesion en el sessionStorage
   */
  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.id = payload.idUsuario
    this._proveedor.id = payload.idProveedor
    this._proveedor.nombre = payload.nombre;
    this._proveedor.primerApellido = payload.primerApellido;
    this._proveedor.segundoApellido = payload.segundoApellido;
    this._proveedor.rut = payload.rut;
    this._proveedor.imagen = payload.image
    this._usuario.proveedor = this._proveedor;
    this._usuario.correo = payload.email;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  /**
   * 
   * @param registerDto 
   * Envia objeto con nuevo usuario a registrar
   * @returns 
   */
  registrar(registerDto:any):Observable<Usuario>{
    return this.http.post<Usuario>("http://localhost:8080/api/register/", registerDto);
  }

  
  /**
   * 
   * @param accessToken 
   * Decodifica el token creado por el backend, asi devolviendo un string en formato JSON
   * @returns 
   */
  obtenerDatosToken(accessToken: string | null): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  /**
   * 
   * @param accessToken 
   * Guarda el token en el session storage de nuestro navegador
   */
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  /**
   * Metodo que informa si el usuario sigue autenticado
   * @returns 
   */
  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.email && payload.email.length > 0) {
      return true;
      console.log("Authenticate!!!!")
    }
    return false;
  }
  
  /**
   * Metodo para cerrar sesion y limpiar el session storage de nuestro navegador
   */
  logout(): void {
    this._token = undefined;
    this._usuario = undefined;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
