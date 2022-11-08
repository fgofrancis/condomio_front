import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apartamento } from 'src/app/models/apartamento.model';
import { Pago } from 'src/app/models/pago.model';
import { Pagodetalle } from 'src/app/models/pagodetalle.model';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { ReciboService } from 'src/app/services/recibo.service';

const FECHABASE = '1972-06-27';

@Component({
  selector: 'app-consultar-pagos',
  templateUrl: './consultar-pagos.component.html',
  styles: [
  ]
})
export class ConsultarPagosComponent implements OnInit {

  public apartamentoForm!:FormGroup;
  public apartamentos: Apartamento[] = [];
  public idapartamento:string = '';

  public pagos:Pago[] =[];
  public pagodetalles:Pagodetalle[] = [];
  public isVerdetallepago:boolean = false;
  public fechapago!:Date ;

  constructor(private _fb:FormBuilder,
              private _apartamentoService: ApartamentosService,
              private _reciboService:ReciboService) { }

  ngOnInit(): void {

      this.apartamentoForm = this._fb.group({
        codigo:['',Validators.required],
        planta:['',Validators.required],
        idbloque:['',Validators.required],
        saldomantenimiento:[''],
        idpropietario:['',Validators.required],
        habitado:['']
      });

      //  this.fechapago = new Date(); //fecha del dia actual
       console.log('Fecha pago..:', this.fechapago);

      this.cargarApartamentos();

      this.apartamentoForm.get('codigo')?.valueChanges.subscribe(idapartamento=>{
        console.log('idapartamento..: ', idapartamento, this.fechapago);
        this.idapartamento = idapartamento
        
        if(!this.fechapago){
          this.fechapago = new Date('1972-06-27');
          console.log('FechaPago into IF..: ', (this.fechapago));
        }
        // console.log('FechaPago..: ', (this.fechapago).getDate());
        console.log('FechaPago out IF..: ', (this.fechapago));

        let criterio = {idapartamento:this.idapartamento, fechapago:this.fechapago}
        this.buscarPagos(criterio);
        this.isVerdetallepago = false;
      });

  }

  guardarApartamento(){}

  cargarApartamentos(){
    this._apartamentoService.cargarApartamentos().subscribe(({apartamentos})=>{
      this.apartamentos = apartamentos
    })
  }

  buscarPagos(criterio:{idapartamento:string, fechapago:Date }){
    this._reciboService.buscarReciboByIdApartamento(criterio.idapartamento, criterio.fechapago)
          .subscribe((resp:any)=>{
      console.log('Pagos..: ', resp)
      this.pagos = resp.pagos
    })
  }

  buscarDetallePago(idpago:string){
    this.isVerdetallepago = true;
    this._reciboService.buscarDetalleReciboByIdPago(idpago).subscribe((resp:any)=>{
      console.log('Detalle pago..: ', resp.detallepago);
      this.pagodetalles = resp.detallepago
    })
  }
  
  capturarFechaOnChange(event:any){
    console.log(event.target.value);
    this.fechapago = event.target.value;

    if(!this.fechapago){
      this.fechapago = new Date(FECHABASE);
      console.log('FechaPago into IF del Calendario..: ', (this.fechapago));
    }

    // console.log('Fecha pago cambio..:', this.fechapago);
    let criterio = {idapartamento:this.idapartamento, fechapago:this.fechapago}
    this.buscarPagos(criterio);
  }
  
}
