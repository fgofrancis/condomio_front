import { Component, OnInit } from '@angular/core';

// pdfMake 
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { IResumenCuotas } from 'src/app/interfaces/resumen-cuotas';
import { CuotasService } from 'src/app/services/cuotas.service';


@Component({
  selector: 'app-cns-general',
  templateUrl: './cns-general.component.html',
})
export class CnsGeneralComponent implements OnInit {

  public arrCuotas: IResumenCuotas[]= [];
  public resumenCuotas: any[]= [];
  public anioSeleccionado:number = 1;

  constructor( private _cuotaService:CuotasService) { }

  ngOnInit(): void {
    // this.arrCuotas =[{
    //   Apto:'A-101',
    //   Ene:1200,
    //   Feb:3200,
    //   Mar:0,
    //   Abr:4203,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // },
    // {
    //   Apto:'A-102',
    //   Ene:1200,
    //   Feb:3200,
    //   Mar:0,
    //   Abr:4203,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // },
    // {
    //   Apto:'A-103',
    //   Ene:1200,
    //   Feb:3200,
    //   Mar:0,
    //   Abr:4203,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // },
    // {
    //   Apto:'A-104',
    //   Ene:200,
    //   Feb:3200,
    //   Mar:0,
    //   Abr:4203,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // },
    // {
    //   Apto:'A-201',
    //   Ene:300,
    //   Feb:0,
    //   Mar:0,
    //   Abr:1950,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // },
    // {
    //   Apto:'A-202',
    //   Ene:300,
    //   Feb:0,
    //   Mar:0,
    //   Abr:1950,
    //   May:5000,
    //   Jun:700,
    //   Jul:920,
    //   Ago:6320,
    //   Sep:1000,
    //   Oct:7000,
    //   Nov:750,
    //   Dic:3200,
    //   Total:27100
    // }]
    // console.log(this.arrCuotas);
  }
  cargarCuotas(anioSeleccionado:number){
    this._cuotaService.resumenCuotas(anioSeleccionado).subscribe(
      (res)=>{
        this.resumenCuotas = res;
        console.log(this.resumenCuotas)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  reporte(){
   
    //Crear tabla del reporte
    const table ={
      headerRows: 1,
      widths: ['*','auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
      body: [
              [  {text:'APTO', bold:true, fontSize:10}, {text:'ENE',  bold:true, fontSize:10}, {text:'FEB', bold:true, fontSize:10},
                 {text:'MAR', bold:true, fontSize:10},  {text:'ABR',  bold:true, fontSize:10}, {text:'MAY', bold:true, fontSize:10} ,
                 {text:'JUN', bold:true, fontSize:10},  {text:'JUL',  bold:true, fontSize:10}, {text:'AGO', bold:true, fontSize:10} ,
                 {text:'SEP', bold:true, fontSize:10},  {text:'OCT',  bold:true, fontSize:10}, {text:'NOV', bold:true, fontSize:10} ,
                 {text:'DIC', bold:true, fontSize:10}, {text:'TOTAL', bold:true, fontSize:10}
             ],
             ...this.resumenCuotas.map(p => ([ {text: p.codigo },
                  {text: p.saldosPorMes.ene?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.feb?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.mar?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.abr?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.may?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.jun?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.jul?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.ago?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.sep?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.oct?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.nov?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.saldosPorMes.dic?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.total?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 }
                  
               ])
             ), 
      ]
    }

    // Obtener los totales de cada columna de la tabla
    const columnTotals = Array.from({ length: 13 }, () => 0);
      this.resumenCuotas.forEach(p => {
          // columnTotals[0] += p.codigo;
          columnTotals[0] += p.saldosPorMes.ene || 0;
          columnTotals[1] += p.saldosPorMes.feb || 0;
          columnTotals[2] += p.saldosPorMes.mar || 0;
          columnTotals[3] += p.saldosPorMes.abr || 0;
          columnTotals[4] += p.saldosPorMes.may || 0;
          columnTotals[5] += p.saldosPorMes.jun || 0;
          columnTotals[6] += p.saldosPorMes.jul || 0;
          columnTotals[7] += p.saldosPorMes.ago || 0;
          columnTotals[8] += p.saldosPorMes.sep || 0;
          columnTotals[9] += p.saldosPorMes.oct || 0;
          columnTotals[10] += p.saldosPorMes.nov || 0;
          columnTotals[11] += p.saldosPorMes.dic || 0;
          columnTotals[12] += p.total || 0;
      });
    console.log('columnTotals..: ', columnTotals);

    //agregar totales al final de la tabla
    const totalRow = [{ text:'Totales', bold:true}, ...columnTotals.map( total=>({text:total.toLocaleString('en-ES', { style: 'decimal', currency: 'INR', minimumFractionDigits: 2 }),alignment: 'right', fontSize:10 }))];
    table.body = table.body.concat([totalRow]);
 
    let cantPago = this.resumenCuotas.length;

    let docDefinition:any ={

      pageOrientation:'landscape',

      footer: {
        columns: [
          { text: 'Cosmos Digital SRL RNC:1-31-98720-6 Phone: 809-224-1509 Email:francisfiguereo@cdigital.com',
            alignment: 'center',
            fontSize:8,
            bold:true,
            color:'#560189'
          }
        ]
      },
      content:[
        {  
          text: 'CONDOMINIO PLAZA MIRADOR',  
          fontSize: 16,  
          alignment: 'center',  
          color: '#047886'  
        }, 
        { text:'Ave. Anacaona #43, Bella Vista D.N, R.D',
          alignment: 'center'
        },
        { text:'RNC 4-30-17865-9', alignment: 'center'},
        { text:' '},
        { text:' '},
        { text:' '},

        {
          text:`Resumen General de Saldo por Mes`,
          fontSize: 14,
          // bold:true,
          color: '#047886'
        },
  
        {
          columns:[

            [
              {
                text:`Cantidad de Apartementos:  *** ${cantPago} *** `,
                // bold:true,
                color:'#047886',
                fontSize: 12
              },
            ],

          ]
        },
        
        {
          table:table
        },

        [
          {
            text: `impresión: ${new Date().toLocaleString()}`,
            alignment: 'right'
          }
        ]
      ]
    }
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }

}

