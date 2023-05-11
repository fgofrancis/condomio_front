import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cuota } from '../models/cuota.model';
import { Procesocuota } from '../models/procesocuota.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  constructor(private _http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
        responseType: 'json'
      }
    }
  }

  generarCuotas(fechacuotas:Date){
    const url = `${base_url}/cuotas/generarcuotas/${fechacuotas}`;
    // return this._http.get(`${base_url}/cuotas/generarcuotas`);
    return this._http.get<any>( url, this.headers )
    .pipe(
      map( (resp: {ok:boolean, cuotas:Cuota[] }) => resp.cuotas)
    )
  };

  generarCuotasExtra(monto:number, idapto?:string){
    
    //Debido a que idapto puede venir undefine o null realizo este if
    const url = (idapto)
              ? `${base_url}/cuotas/generarcuotaextraordinaria/${monto}/${idapto}`
              : `${base_url}/cuotas/generarcuotaextraordinaria/${monto}`

    // const url = `${base_url}/cuotas/generarcuotaextraordinaria/${monto}/${idapto}?`;
    return this._http.get<any>( url, this.headers)
                 .pipe(
                  // map( (resp: {ok:boolean, cuotas:any[], cantidad:number} )=> resp.cuotas )
                  map( (resp: {ok:boolean, cuotas:any[], cantidad:number} )=>({cuotas: resp.cuotas, cantidad: resp.cantidad}) )
                 )
  }

  cargarCuotas(){
    const url = `${base_url}/cuotas`;
    return this._http.get<any>( url, this.headers )
                .pipe(
                  map( (resp: {ok:boolean, cuotas:Cuota[] }) => resp.cuotas)
                )
  }
  
  buscarCuotaById(id:string){
    const url = `${base_url}/cuotas/${id}`;
    return this._http.get<any>(url, this.headers )
                .pipe(
                  map( (resp:{ok:boolean, cuota:Cuota} )=> resp.cuota)
                )
  };

  buscarCuotaByIdApartamento(idApartamento:string){
    const url = `${base_url}/cuotas/apto/${idApartamento}`;
    return this._http.get<any>(url, this.headers )
                .pipe(
                  map( (resp:{ok:boolean, cuotas:Cuota} )=> resp.cuotas)
                )
  };

  buscarProcesoCuotasMax(){
    const url = `${base_url}/cuotas/procesocuotamax`;
    return this._http.get<any>(url, this.headers )
                .pipe(
                  map((resp: {ok:boolean, endDate:Date})=> resp.endDate)
                )
  };

  resumenCuotas(anio:number){
    const url = `${base_url}/cuotas/resumen/${anio}`;
    return this._http.get<any>(url, this.headers )
                .pipe(
                  map( (resp: {ok:boolean, saldosPorApartamento:any[]})=>resp.saldosPorApartamento )
                )
  }
};

 