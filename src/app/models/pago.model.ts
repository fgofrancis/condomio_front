import { Apartamento } from "./apartamento.model"

export class Pago {
    constructor(
        public _id:string,
        public idapartamento:Apartamento,
        public fechageneracion:Date,
        public monto:number,
        public formapago:string,
        public estatus:boolean
    ){}
}