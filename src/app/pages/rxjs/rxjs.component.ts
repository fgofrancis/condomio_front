import { Component, OnInit } from '@angular/core';

// import pdfMake from "pdfmake/build/pdfmake";  
// import pdfFonts from "pdfmake/build/vfs_fonts";  
// pdfMake.vfs = pdfFonts.pdfMake.vfs;   

/**
 * Esto funciona con angular 13, ver ejemplo testpdf
 */
// var pdfmake = require("pdfmake/build/pdfmake");
// var pdfFonts = require("pdfmake/build/vfs_fonts");
// pdfmake.vfs = pdfFonts.pdfMake.vfs;

//  import { Img, PdfMakeWrapper } from 'pdfmake-wrapper';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  public Farenh:number = 33.8;
  public Celsio:number =1;
  constructor() { }

  ngOnInit(): void {
  }
  calcF(F:string){
    this.Farenh = this.Celsio *9/5 + 32;
  }
  calcC(F:string){
    this.Celsio = (this.Farenh - 32 ) * 5/9;
  }

  calcG(){}

  generarPDF(){
    console.log('Hola.......');
    const pdfDefinition: any={
      content:[
         {
            text:'Bienvenido a PDFMake', style:'header'
         },
         'He logrado resolver este tema',
         {
            text:'Otro párrafo mas', style:'header'
         },
         'Pero veo que aun me faltan cosas por lograr, no me salen los títulos en negrita'
      ]
    }
    // const pdf = pdfmake.createPdf(pdfDefinition);
    // pdf.open();
    
    // const pdf:PdfMakeWrapper = new PdfMakeWrapper();
    // pdf.add('Hello word');
    // pdf.create().open();

  }

  async generarImageinPDF(){
    // const pdf:PdfMakeWrapper = new PdfMakeWrapper();
    // pdf.add(await new Img('https://www.google.com/imgres?imgurl=https%3A%2F%2Fempresas.blogthinkbig.com%2Fwp-content%2Fuploads%2F2019%2F11%2FImagen3-245003649.jpg%3Fw%3D800&imgrefurl=https%3A%2F%2Fempresas.blogthinkbig.com%2Fcomo-obtener-imagenes-para-textos%2F&tbnid=dJGpU0ken9QKCM&vet=12ahUKEwiFwdTd-IP7AhUNC98KHZP3DB8QMygCegUIARDiAQ..i&docid=9BxeIMNbtBvcfM&w=800&h=600&q=imagenes&ved=2ahUKEwiFwdTd-IP7AhUNC98KHZP3DB8QMygCegUIARDiAQ').build() );
    // pdf.create().open();

  }

}
