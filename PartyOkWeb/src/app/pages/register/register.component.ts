import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { LoginService } from 'src/app/services/login.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  regiones: any[] = [];
  provincias!: any[];
  comunas!: any[];
  categorias: any[] = [];

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private locationService: LocalizacionService,
    private proveedoresService: ProveedorService,
    private router: Router) {


    this.formRegister = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaSelect: [this.regiones[2], Validators.required],
      regionSelect: [this.regiones[2], Validators.required],
      provinciaSelect: ['', Validators.required],
      comunaSelect: ['Ingresa Comuna', Validators.required]
    })
    this.locationService.obtenerRegiones().subscribe(
      respuesta => {
        this.regiones = respuesta
        console.log(respuesta)
      }
    )
    this.proveedoresService.obtenerCategorias().subscribe(
      respuesta => this.categorias = respuesta
    )
  }

  ngOnInit(): void {

  }


  registrar() {
    let registerDto = {
      correo: this.formRegister.get("correo")?.value,
      contrasena: this.formRegister.get("contrasena")?.value,
      rut: this.formRegister.get("rut")?.value,
      nombre: this.formRegister.get("nombre")?.value,
      primerApellido: this.formRegister.get("primerApellido")?.value,
      segundoApellido: this.formRegister.get("segundoApellido")?.value,
      descripcion: this.formRegister.get("descripcion")?.value,
      comuna: this.formRegister.get("comunaSelect")?.value,
      categoria: this.formRegister.get("categoriaSelect")?.value
    }
    this.loginService.registrar(registerDto).subscribe(
      respuesta => {
        Swal.fire('Registrar Usuario', `Hola ${respuesta.correo}, tu registro se ha realizado con exito.`, 'info')
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2000);
      }, error => {
        Swal.fire('Registrar Usuario', error.error, 'error')
      }

    )
  }

  obtenerProvincia() {
    let region = this.formRegister.get("regionSelect")?.value

    this.locationService.obtenerProvincias(region.id).subscribe(
      respuesta => this.provincias = respuesta
    )

  }

  obtenerComuna() {
    let provincia = this.formRegister.get("provinciaSelect")?.value

    this.locationService.obtenerComunas(provincia.id).subscribe(
      respuesta => this.comunas = respuesta
    )
  }
}
