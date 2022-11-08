import { Component, OnInit } from '@angular/core';
// import { Img, PdfMakeWrapper } from 'pdfmake-wrapper';



import { Apartamento } from 'src/app/models/apartamento.model';
import { Propietario } from 'src/app/models/propietario.model';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalApartamentoService } from 'src/app/services/modal-apartamento.service';
import { PropietariosService } from 'src/app/services/propietarios.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
 
})
export class PropietariosComponent implements OnInit {

  public propietarios:Propietario[] = [];
  public propietariosTemp:Propietario[] = [];
  public propietario!:Propietario
  public cargando:boolean = false;
  public desde:number  = 0;
  public limite:number  = 5;

  public pagina:number = 5;
  public totalPropietario:number = 0;
  public apartamentos:Apartamento[] = [];

  constructor( private _propietarioService:PropietariosService,
               private _busquedaService:BusquedasService,
               private _modalAptoService:ModalApartamentoService,
               private _apartamentoService:ApartamentosService) { }

  ngOnInit(): void {
     this.cargarPropietarios();
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarPropietarios();
      // return this.propietarios = this.propietariosTemp 
    }

    //Tengo el resultados del tipo any pero no me gusta.
   this._busquedaService.buscar('propietarios',termino)
      .subscribe( resultados => {
        this.propietarios = resultados as Propietario[]
      });
    return;
  }
 
  cargarPropietarios(){
      // this.cargando = true;
      this._propietarioService.cargarPropietarios(this.desde,this.limite).subscribe(({total, propietarios}) =>{
        this.propietarios = propietarios;
        this.totalPropietario = total
      })
  }
    
  eliminarPropietario(propietario: Propietario){
    Swal.fire({
      title: 'Borrar propietario?',
      text: `Está a punto de borrar el propietario ${propietario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._propietarioService.eliminarPropietarioById(propietario._id)
          .subscribe(resp => {
            this.cargarPropietarios();
            Swal.fire(
              'propietario borrado',
              `El propietario ${ propietario.nombre } fue eliminado correctamente`,
              'success'
            )}
          );
      }
    })

  };
 
  cambiarPagina( valor: number ) {
    this.desde += valor;
    this.pagina += valor;

    if ( this.desde < 0 ) {
      this.desde  = 0;
      this.pagina = 5;
    } else if ( this.desde >= this.totalPropietario ) {
      this.desde -= valor; 
      this.pagina = this.totalPropietario;
    }
    // window.print() se usa para imprimir el HTML(lo que está en pantalla) a pdf 
    // pdfMake.createPdf()

    this.cargarPropietarios();

    this.generarPDF();
  }

  abrirModal(propietario: Propietario){
    this._apartamentoService.buscarApartamentoByIdPropietario(propietario._id)
          .subscribe((apartamento)=>{
            this._modalAptoService.modal$.emit(apartamento);
          })
    this._modalAptoService.abrirModal();      
  
  }
  generarPDF(){
    // const pdf:PdfMakeWrapper = new PdfMakeWrapper();
    // pdf.add('Hello word');
    // pdf.create().open();

  }

}
