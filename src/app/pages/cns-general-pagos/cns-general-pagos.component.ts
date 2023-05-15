import { Component, OnInit } from '@angular/core';

// pdfMake 
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { IResumenCuotas } from 'src/app/interfaces/resumen-cuotas';
import { ReciboService } from 'src/app/services/recibo.service';

@Component({
  selector: 'app-cns-general-pagos',
  templateUrl: './cns-general-pagos.component.html',
  styleUrls: ['./cns-general-pagos.component.css']
})
export class CnsGeneralPagosComponent implements OnInit {

  public arrPagos: IResumenCuotas[]= [];
  public resumenPagos: any[]= [];
  public anioSeleccionado:number = 1;
  // public anioSeleccionado!:number;
  public highlightedItem:any = null;
  
  constructor( private _reciboService:ReciboService) { }

  ngOnInit(): void {};

  cargarPagos(anioSeleccionado:number){
    
    this._reciboService.resumenPagos(anioSeleccionado).subscribe(
      (res)=>{
        this.resumenPagos = res;
      },
      (err)=>{
        console.log(err)
      }
    )
  };

  onMouseOver(item:any){
    this.highlightedItem = item;
  }

  onMouseLeave(item:any){
    this.highlightedItem = null;
  }
  reporte(){

    //Crear tabla del reporte
    const table ={
      // fontSize:30,
      headerRows: 1,
      widths: ['*','auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
      body: [
              [  {text:'APTO', bold:true, fontSize:10, fillColor:'#CCCCCC'}, {text:'ENE',  bold:true, fontSize:10, fillColor:'#CCCCCC'}, {text:'FEB', bold:true, fontSize:10, fillColor:'#CCCCCC'},
                 {text:'MAR', bold:true, fontSize:10, fillColor:'#CCCCCC'},  {text:'ABR',  bold:true, fontSize:10, fillColor:'#CCCCCC'}, {text:'MAY', bold:true, fontSize:10, fillColor:'#CCCCCC'},
                 {text:'JUN', bold:true, fontSize:10, fillColor:'#CCCCCC'},  {text:'JUL',  bold:true, fontSize:10, fillColor:'#CCCCCC'}, {text:'AGO', bold:true, fontSize:10, fillColor:'#CCCCCC'},
                 {text:'SEP', bold:true, fontSize:10, fillColor:'#CCCCCC'},  {text:'OCT',  bold:true, fontSize:10, fillColor:'#CCCCCC'}, {text:'NOV', bold:true, fontSize:10, fillColor:'#CCCCCC'},
                 {text:'DIC', bold:true, fontSize:10, fillColor:'#CCCCCC'},  {text:'TOTAL', bold:true, fontSize:10, fillColor:'#CCCCCC'}
             ],
             ...this.resumenPagos.map(p => ([ {text: p.codigo },
                  {text: p.pagosPorMes.ene?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.feb?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.mar?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.abr?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.may?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.jun?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.jul?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.ago?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.sep?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.oct?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.nov?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.pagosPorMes.dic?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 },
                  {text: p.total?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right',fontSize:10 }
               ])
             ), 
            ]
    };

    // Obtener los totales de cada columna de la tabla
    const columnTotals = Array.from({ length: 13 }, () => 0);
    this.resumenPagos.forEach(p => {
          // columnTotals[0] += p.codigo;
          columnTotals[0] += p.pagosPorMes.ene || 0;
          columnTotals[1] += p.pagosPorMes.feb || 0;
          columnTotals[2] += p.pagosPorMes.mar || 0;
          columnTotals[3] += p.pagosPorMes.abr || 0;
          columnTotals[4] += p.pagosPorMes.may || 0;
          columnTotals[5] += p.pagosPorMes.jun || 0;
          columnTotals[6] += p.pagosPorMes.jul || 0;
          columnTotals[7] += p.pagosPorMes.ago || 0;
          columnTotals[8] += p.pagosPorMes.sep || 0;
          columnTotals[9] += p.pagosPorMes.oct || 0;
          columnTotals[10] += p.pagosPorMes.nov || 0;
          columnTotals[11] += p.pagosPorMes.dic || 0;
          columnTotals[12] += p.total || 0;
    });

    //agregar totales al final de la tabla
    const totalRow = [{ text:'Totales', bold:true}, ...columnTotals.map( total=>({text:total.toLocaleString('en-ES', { style: 'decimal', currency: 'INR', minimumFractionDigits: 2 }),alignment: 'right', fontSize:10,bold:true }))];
    table.body = table.body.concat([totalRow]);

    let cantPago = this.resumenPagos.length;

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
          text:`Resumen General de Pagos por Mes`,
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
        [
        {
          table:table
        },
      ],
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
