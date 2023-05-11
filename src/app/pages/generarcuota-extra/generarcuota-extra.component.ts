import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apartamento } from 'src/app/models/apartamento.model';
import { Cuota } from 'src/app/models/cuota.model';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { CuotasService } from 'src/app/services/cuotas.service';


@Component({
  selector: 'app-generarcuota-extra',
  templateUrl: './generarcuota-extra.component.html'

})
export class GenerarcuotaExtraComponent implements OnInit {

  public apartamentoForm!:FormGroup;
  public cargando:boolean = false;
  public cuotas:any[]=[];
  // public cuotas:Cuota[]=[];
  public idapartamento:string = '';
  public apartamentos:Apartamento[] = [];
  public fechacuotas!:Date ;
  public isbtnGenerarProceso:boolean = true;
  public isverApartamentos:boolean = false;
  public isPagoHabilitado:boolean = false;


  public montoPago:number = 0;

  constructor( private _cuotasService:CuotasService,
               private _apartamentoService:ApartamentosService,
               private _fb:FormBuilder ) { }

  ngOnInit(): void {

    this.apartamentoForm = this._fb.group({
      codigo:['',Validators.required] 
    });

    this.cargarApartamentos();
    this.apartamentoForm.get('codigo')?.valueChanges.subscribe(
      (idapartamento)=>{ 
        this.idapartamento = idapartamento 
      },
      (err)=>{
         console.log('err', err)
      })
  };

  // guardarApartamento(){}

  generarCuota(monto:number, idapartamento:string){
    this._cuotasService.generarCuotasExtra(monto,idapartamento).subscribe(
      (resp)=>{
        this.cuotas = resp.cuotas;
      },
      (err)=>{
        console.log('err', err)
      })
  };

  habilitarPago(montoPago:number){
    this.isPagoHabilitado = (montoPago > 0)? true: false;  
  };

  // No me da los resultados esperados 
  // (input)="darFormatoNumerico()" value="{{montoPago}}" en el HTML
  darFormatoNumerico(){
    let valor = parseFloat(this.montoPago.toString());
    this.montoPago = isNaN(valor)? 0 : valor;
    // this.montoPago = parseFloat(Number(this.montoPago).toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}) )
    this.montoPago = parseFloat(Number(this.montoPago).toLocaleString('es-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2}))
  };


  cargarApartamentos(){
    this._apartamentoService.cargarApartamentos().subscribe(({apartamentos})=>{
      this.apartamentos = apartamentos
    })
  };

  capturarFechaOnChange(event:any){
    // console.log(event.target.value);
    this.fechacuotas = event.target.value;
    this.isbtnGenerarProceso = false;
    this.isverApartamentos = false;
    this.cuotas =  [];
    // console.log('Fecha proceso..:', this.fechacuotas);
  }

}
