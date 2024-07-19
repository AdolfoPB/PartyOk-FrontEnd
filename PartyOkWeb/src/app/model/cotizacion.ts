import { Proveedor } from "./proveedor";

export class Cotizacion{
    id!:number | null;
    contacto!:string;
    descripcion!:string;
    eliminado!:boolean;
    proveedor!:Proveedor | undefined
}