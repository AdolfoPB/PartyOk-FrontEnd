import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Cotizacion } from 'src/app/model/cotizacion';
import { Proveedor } from 'src/app/model/proveedor';
import { CotizarService } from 'src/app/services/cotizar.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  proveedor: Proveedor = new Proveedor();
  id: number = 0;

  formCotizacion!:FormGroup;
  
  constructor(private cotizarService:CotizarService, 
    private formBuilder:FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private proveedorService:ProveedorService) {
  
    this.formCotizacion = this.formBuilder.group({
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required]
    })

   }

  getMenuId: any;
  menuData: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id'])
      this.id = params['id'];
      this.proveedorService.findById(this.id).subscribe(respuesta => {
      this.proveedor = respuesta
       }
      )
    })
  }

  cotizar(){
    console.log(this.proveedor)
    let cotizacion:Cotizacion = {
      id: null,
      contacto: this.formCotizacion.get("correo")?.value,
      descripcion: this.formCotizacion.get("descripcion")?.value,
      eliminado: false,
      proveedor: this.proveedor
    }
    this.cotizarService.cotizar(cotizacion).subscribe(
      respuesta => Swal.fire('Cotización', `Cotizacion realizada con exito !!!!`, 'info')
    )
  }

}
