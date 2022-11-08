import { Component, OnInit } from '@angular/core';
import { Apartamento } from 'src/app/models/apartamento.model';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CuotasService } from 'src/app/services/cuotas.service';
import { ModalApartamentoService } from 'src/app/services/modal-apartamento.service';
import { ModalCuotasService } from 'src/app/services/modal-cuotas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.component.html',
  styles: [
  ]
})
export class ApartamentosComponent implements OnInit {

  public apartamentos:Apartamento[] = [];
  public apartamento!:Apartamento
  public cargando:boolean = false;
  public desde:number   = 0;
  public limite:number  = 5;
  
  public pagina:number = 5;
  public totalApartamento:number = 0;

  constructor( private _apartamentoService:ApartamentosService,
               private _busquedaService:BusquedasService,
               private _cuotaService:CuotasService,
               private _modalCuotasService:ModalCuotasService) { }

  ngOnInit(): void {
     this.cargarApartamentos();
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarApartamentos();
    }
 
    //Tengo el resultados del tipo any pero no me gusta.
   this._busquedaService.buscar('apartamentos',termino)
      .subscribe( resultados => {
        this.apartamentos = resultados as Apartamento[]
      });
  }

  cargarApartamentos(){
      // this.cargando = true;
      this._apartamentoService.cargarApartamentos(this.desde,this.limite)
            .subscribe(({total, apartamentos}) =>{
                    this.apartamentos = apartamentos;
                    this.totalApartamento = total
      })
  }
    
  eliminarApartamento(apartamento: Apartamento){
    Swal.fire({
      title: 'Borrar apartamento?',
      text: `Está a punto de borrar el apartamento ${apartamento.codigo}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._apartamentoService.eliminarApartamentoById(apartamento._id)
          .subscribe(resp => {
            this.cargarApartamentos();
            Swal.fire(
              'apartamento borrado',
              `El apartamento ${ apartamento.codigo } fue eliminado correctamente`,
              'success'
            )}
          );
      }
    })
 
  }

  abrirModal(apartamento: Apartamento){
    this._cuotaService.buscarCuotaByIdApartamento(apartamento._id)
          .subscribe((cuota)=>{
            this._modalCuotasService.modal$.emit(cuota);
          })
          
    this._modalCuotasService.abrirModal();      
  
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    this.pagina += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
      this.pagina = 5;
    } else if ( this.desde >= this.totalApartamento ) {
      this.desde -= valor; 
      this.pagina = this.totalApartamento
    }

    this.cargarApartamentos();
  }

}
