
class rpt {

    public resumenCuotas: any[]= [];

reporte(){
   
    // Obtener los totales de cada columna
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
    const totalRow = [{ text:'Totales', bold:true}, ...columnTotals.map( total=>({text:total.toLocaleString('en-ES', { style: 'decimal', currency: 'INR', minimumFractionDigits: 2 }),alignment: 'right' }))];
    //  this.reporte.table.body = this.reporte.table.body.concat([totalRow]);
   

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
          table:{
            headerRows: 1,
            widths: ['*','auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
            body: [
                    [  {text:'APTO', bold:true}, {text:'ENE', bold:true}, {text:'FEB', bold:true},
                       {text:'MAR', bold:true},  {text:'ABR', bold:true}, {text:'MAY', bold:true} ,
                       {text:'JUN', bold:true},  {text:'JUL', bold:true}, {text:'AGO', bold:true} ,
                       {text:'SEP', bold:true},  {text:'OCT', bold:true}, {text:'NOV', bold:true} ,
                       {text:'DIC', bold:true}, {text:'TOTAL', bold:true} ],
                        ...this.resumenCuotas.map(p => ([ p.codigo,
                             {text: p.saldosPorMes.ene?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.feb?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.mar?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.abr?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.may?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.jun?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.jul?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.ago?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.sep?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.oct?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.nov?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.saldosPorMes.dic?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'},
                             {text: p.total?.toLocaleString('en-ES', {style: 'decimal', currency: 'INR', minimumFractionDigits: 2}), alignment:'right'}
                             
                          ])
                        ), 
                        [
                         
                        ],
                        // [
                        //   {text:'Totates'},  
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.ene), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.feb), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.mar), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.abr), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.may), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.jun), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.jul), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.ago), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.sep), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.oct), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.nov), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.saldosPorMes.dic), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true},
                        //   { text: this.resumenCuotas.reduce((sum, p)=> sum + (p.total), 0).toLocaleString('en-ES', {style: 'decimal',currency: 'USD', minimumFractionDigits: 2}), alignment:'right', bold:true}
                        // ],
            ]
          },

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
} // es un backup del reporte