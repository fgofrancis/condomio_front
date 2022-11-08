import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Apartamento } from 'src/app/models/apartamento.model';
import { Cuota } from 'src/app/models/cuota.model';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { CuotasService } from 'src/app/services/cuotas.service';
import { ReciboService } from 'src/app/services/recibo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styles: [
  ]
})
export class ReciboComponent implements OnInit {

  public cuotas:Cuota[] = [];
  public apartamentoForm!:FormGroup;
  public apartamentos:Apartamento[] = [];
  public totalSaldo:number = 0;
  public idapartamento:string = ''
  public montoPapgo:number = 0;
  public isPagoHabilitado:boolean = false;

  constructor( private _cuotaService:CuotasService,
               private _fb:FormBuilder,
               private _apartamentoService:ApartamentosService,
               private _reciboService:ReciboService) { }

  ngOnInit(): void {
    this.apartamentoForm = this._fb.group({
      codigo:['',Validators.required],
      planta:['',Validators.required],
      idbloque:['',Validators.required],
      saldomantenimiento:[''],
      idpropietario:['',Validators.required],
      habitado:['']
    })

    this.cargarApartamentos()
    this.apartamentoForm.get('codigo')?.valueChanges.subscribe(idapartamento=>{
      console.log('Cambio apto', idapartamento);
      this.idapartamento = idapartamento;
      this.buscar(idapartamento);

      this.montoPapgo = 0;
      this.isPagoHabilitado = false; 
    })
   this.montoPapgo = 0; 
  }

  buscar(termino:string){
      this._cuotaService.buscarCuotaByIdApartamento(termino)
      .pipe(
        tap((cuota:any) =>{
          this.totalSaldo = 0;
          this.cuotas = cuota
          this.cuotas.forEach((cuota)=>{
              this.totalSaldo += cuota.saldo
          })
        })
      )
      .subscribe((cuota:any)=>{
            this.cuotas = cuota 
            console.log('cuota..: ', cuota)
      })
  }

  guardarApartamento(){}

  cargarApartamentos(){
    this._apartamentoService.cargarApartamentos().subscribe(({apartamentos})=>{
      this.apartamentos = apartamentos
    })
  }

  aplicarPago(){
    console.log('this.idapartamento..: ', this.idapartamento, this.montoPapgo)
    const data = {idapartamento: this.idapartamento, monto:this.montoPapgo};

    this._reciboService.pagoCuota(data).subscribe(resp=>{
      Swal.fire('Recibo',`Pago de: ${ data.monto } Aplicado correctamente`, 'success');
      console.log(resp)
    })
  }

  habilitarPago(montoPapgo:number){
    if (montoPapgo > 0 ) 
        this.isPagoHabilitado = true;
    else
      this.isPagoHabilitado = false
  }
}
