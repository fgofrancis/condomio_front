import { Injectable } from '@angular/core';

import { EscalaSalarial } from '../models/escalaSalaria-model';
import { EscalaService } from './escalas.service';
import { ParametroService } from './parametro.service';

var ISR:number=0;

@Injectable({
  providedIn: 'root'
})
export class RetencionLeyService {

  public scala:EscalaSalarial[]=[]
  public impSR:number = 0;
  public Test:number = 0;

  public sfs:number  = 0;
  public smp:number  = 0;
  public svds:number = 0;

  constructor( private _escalaService:EscalaService,
               private _parametroService:ParametroService,)
   {
      // Nota: si los parametros generales cambian despues de cargar el 
      // servicio estos cambios no se reflejaran
     this._parametroService.cargarParametros()
        .subscribe(parametro=>{
           this.sfs  = parametro[0].seguroFamiliarSalud.tasaEmpleado
           this.smp  = parametro[0].salarioMinPromedio
           this.svds = parametro[0].seguroVejezDiscapSobrevivencia.tasaEmpleado
     });

     //Buscar datos de la escala salarial
     this._escalaService.cargarEscala()
        .subscribe(resp =>{
           this.scala = resp;
     });

  }
 
   calcISR(salario:number){
    ISR = 0;
    // debugger 
    this.impSR = 0;
    this.impSR =  this.calc_ISR_I(salario,this.scala);
     return  this.impSR;
  }

   calc_ISR_I(salario:number, scalap:EscalaSalarial[]):number{

     scalap.forEach(myFuncion);
     function myFuncion(value:EscalaSalarial){
            
       let salarioExc = 0;
      //  salario = 65863; // salario para test, el calculo está bien
       let salarioCotizable = salario * 12;

       if ( (value.renglon == 1) && (salarioCotizable <= value.hasta) ){
              ISR = 0;
       }
       if ( (value.renglon == 2) && ((salarioCotizable > value.desde) && (salarioCotizable <= value.hasta)) ){
           salarioExc = salarioCotizable - value.desde;
           ISR = salarioExc * (value.tasa / 100);
       }

       if (((value.renglon == 3)) && (( salarioCotizable > value.desde) && (salarioCotizable <= value.hasta)) ){
          salarioExc = salarioCotizable - value.desde;
          ISR = (salarioExc * (value.tasa / 100)) + value.constante;
       }

       if (((value.renglon == 4)) && ((salarioCotizable > value.desde) && (salarioCotizable <= value.hasta)) ){
          salarioExc = salarioCotizable - value.desde;
          ISR = ( salarioExc * (value.tasa / 100) ) + value.constante;
       }
     }
     return ISR
  }

   calcSFS(salario:number):number{

    var ret_sfs = 0;
    if(salario > (this.smp * 10)){
      
      ret_sfs =  (this.smp * 10) * (this.sfs/100);
      ret_sfs = ret_sfs / 2;
  
    }else{
      ret_sfs =  (salario) *  (this.sfs/100);
      ret_sfs = ret_sfs / 2;
    }
    return ret_sfs
  }

  calcAFP(salario:number){
    
    var ret_afp = 0;

    if(salario > (this.smp * 20)){
      ret_afp =  (this.smp * 20) * (this.svds / 100);
      ret_afp = ret_afp / 2;

    }else{
      ret_afp =  salario * (this.svds / 100);
      ret_afp = ret_afp / 2;

    }
    return ret_afp
  }

}
