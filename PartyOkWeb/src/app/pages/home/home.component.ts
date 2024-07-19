import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  proveedores:any[] = [];

  constructor(private proveedorServer:ProveedorService) {

      this.proveedorServer.obtenerMasSolicitados().subscribe(
        respuesta => {
          this.proveedores.push(respuesta[0])
          this.proveedores.push(respuesta[1])
          this.proveedores.push(respuesta[3])
          this.proveedores.push(respuesta[4])

          console.log(this.proveedores)
        }
      )

   }
  foodData:any;
  ngOnInit(): void {
  
  }

}
