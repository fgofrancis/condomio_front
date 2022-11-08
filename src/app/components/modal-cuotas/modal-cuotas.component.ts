import { Component,  OnChanges,  OnDestroy,  OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cuota } from 'src/app/models/cuota.model';
import { ModalCuotasService } from 'src/app/services/modal-cuotas.service';

@Component({
  selector: 'app-modal-cuotas',
  templateUrl: './modal-cuotas.component.html',
})
export class ModalCuotasComponent implements OnInit, OnDestroy {

  public cuotas:Cuota[]=[];
  public apartamento: string = '';
  public totalSaldo:number = 0;
  public isTotalSaldo: boolean = true;
  public modalData! : Subscription

  constructor( public _modalCuotasService:ModalCuotasService) { }
  
  ngOnDestroy(): void {
    this.modalData.unsubscribe();
  }
 

  ngOnInit(): void {
    this.cargarCuotas();
  }

  cargarCuotas(){
   this.modalData = this._modalCuotasService.modal$
    .pipe(
      tap((cuota:any) =>{
        this.totalSaldo = 0;
        this.cuotas = cuota
        this.cuotas.forEach((cuota)=>{
            this.totalSaldo += cuota.saldo
        });
      })
    )
    .subscribe(cuotas=>{
      this.cuotas = cuotas;
      if (this.cuotas.length > 0){
        this.apartamento = cuotas[0].idapartamento.codigo;
      }else{
        this.apartamento = 'N/A'  //Debo resolver esto
      }
    })
  }
  
  cerrarModal(){
    this.totalSaldo = 0;
    this.isTotalSaldo = false;
    this._modalCuotasService.cerrarModal();
  }

  calcularTotales(cuota: Cuota[]){
    this.totalSaldo = 0;
    this.isTotalSaldo = true;
    // this.cuotas.forEach((cuota)=>{
      cuota.forEach((cuota)=>{
      this.totalSaldo += cuota.saldo
    })
  }

}
