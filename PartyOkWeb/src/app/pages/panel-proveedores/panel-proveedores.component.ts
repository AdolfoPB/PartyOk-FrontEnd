import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cotizacion } from 'src/app/model/cotizacion';
import { Proveedor } from 'src/app/model/proveedor';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-panel-proveedores',
  templateUrl: './panel-proveedores.component.html',
  styleUrls: ['./panel-proveedores.component.css']
})
export class PanelProveedoresComponent implements OnInit {

  usuario: Usuario;
  formUsuario: FormGroup;
  cotizaciones: Cotizacion[] = [];
  private imagen!: File;


  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private proveedorService: ProveedorService) {
    this.usuario = this.loginService.usuario;
    
    
    /**
     * Creacion del formulario para editar informacion del proveedor
     */
    this.formUsuario = this.formBuilder.group({
      rut: [this.usuario.proveedor.rut, Validators.required],
      nombre: [this.usuario.proveedor.nombre, Validators.required],
      descripcion: [this.usuario.proveedor.descripcion, Validators.required],
      apellidoPaterno: [this.usuario.proveedor.primerApellido, Validators.required],
      apellidoMaterno: [this.usuario.proveedor.segundoApellido, Validators.required],
    })
    /**
     * obtiene la informacion del proveedor que ha iniciado sesion
    */
    this.proveedorService.getProveedor(this.usuario.proveedor.id).subscribe(
      respuesta => this.cotizaciones = respuesta, error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

  /**
   * Metodo que obtiene los datos del formulario para luego ser enviaados al backend usando  el proveedor service
   * 
   */
  actualizarProveedor() {
    let proveedor: Proveedor = {
      id: this.usuario.proveedor.id,
      nombre: this.formUsuario.get("nombre")?.value,
      rut: this.formUsuario.get("rut")?.value,
      primerApellido: this.formUsuario.get("apellidoPaterno")?.value,
      segundoApellido: this.formUsuario.get("apellidoMaterno")?.value,
      imagen: this.usuario.proveedor.imagen,
      descripcion: this.formUsuario.get("descripcion")?.value
    }
    this.proveedorService.actualizar(proveedor).subscribe(
      respuesta => console.log(respuesta)
    )
  }

  /**
   * Metodo para obtener el evento al seleccionar la imagen y almacenar esta en una propiedad
   * @param event 
   */
  seleccionarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  /**
   * 
   * Metodo para enviar la imaagen seleccionadaa
   */
  subirImagen() {
    this.proveedorService.subirImage(this.imagen, this.usuario.proveedor.id).subscribe(
      respuesta => console.log(respuesta)
    )
  }
}
