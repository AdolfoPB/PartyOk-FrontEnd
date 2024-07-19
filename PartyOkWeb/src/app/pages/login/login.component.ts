import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  constructor(private loginService:LoginService, private route:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    /**
     * Cada vez que se ingrese al componente login verificar si existe un usuario logeado, en caso de ser asi redirreciona la app al panel de proveedores
     */
    if (this.loginService.isAuthenticated()) {
      Swal.fire('Iniciar Sesión', `Hola ${this.loginService.usuario.correo} ya estás autenticado!`, 'info');
      this.route.navigate(['/panelproveedor']);
    }
  }

  /**
   * Metodo que obtiene la data del formulario de login para enviar al backend y validar estas credenciales
   * @returns 
   */
  login():void {
    if(this.usuario.correo == null || this.usuario.contrasena == null){
        return;
    }
    this.loginService.login(this.usuario).subscribe(
      respuesta => {
        this.loginService.guardarUsuario(respuesta.access_token)
        this.loginService.guardarToken(respuesta.access_token)
        this.route.navigate(['/panelproveedor'])
      }
    )
  }

  /**
   * Navegamos hacia la vista para registrar usuarios
   */
  registrar(){
    this.route.navigate(['/registrar'])
  }
  
}


