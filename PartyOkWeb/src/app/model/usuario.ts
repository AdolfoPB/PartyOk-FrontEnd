import { Proveedor } from "./proveedor";

export class Usuario {
    id!: number;
    correo!: string;
    contrasena!: string;
    proveedor!:Proveedor
    roles:string[] = [];
}
