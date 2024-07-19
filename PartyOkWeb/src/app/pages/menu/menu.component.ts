import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Proveedor } from 'src/app/model/proveedor';
import { CotizarService } from 'src/app/services/cotizar.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  proveedores:any[] = [];
  categorias:any[] = [];
  formCategorias:FormGroup;

  constructor(private serviceProveedores: ProveedorService, private formBuilder:FormBuilder) {

   this.formCategorias = this.formBuilder.group({
      categoria: [this.categorias[1], Validators.required]
  })

    this.serviceProveedores.getProveedores().subscribe(respuesta => this.proveedores = respuesta);
    this.serviceProveedores.obtenerCategorias().subscribe(respuesta => {this.categorias = respuesta});
   }
 
   ngOnInit(): void {
    
    
  }


  filtrar(){
   
    if(this.formCategorias.get("categoria")?.value == null){
      this.serviceProveedores.getProveedores().subscribe(respuesta => this.proveedores = respuesta);
    }else{
      let id:number = this.formCategorias.get("categoria")?.value.id
      this.serviceProveedores.findByCategoria(id).subscribe(
        respuesta => this.proveedores = respuesta
      )
    }
  }

}
