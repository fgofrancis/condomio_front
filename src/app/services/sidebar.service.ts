import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    { 
      titulo:'Mantenimientos',
      icono:'mdi mdi-clipboard-outline',
      submenu:[
        {titulo: 'Bloques', url:'/nomina/bloques'},
        {titulo: 'Propietarios', url:'/nomina/propietarios'},
        {titulo: 'Apartamentos', url:'/nomina/apartamentos'},
        // {titulo: 'Aplicar pago', url:'/nomina/recibo'},
        // {titulo: 'Consultar Pagos', url:'/nomina/consultar-pagos'},
        // {titulo: 'Consulta General Saldos', url:'/nomina/consulta-general-saldos'},
        // {titulo: 'Consulta General Pagos', url:'/nomina/consulta-general-pagos'},
        // {titulo: 'Generar Cuotas', url:'/nomina/generacuotas'},
        // {titulo: 'Generar Cuotas Extra', url:'/nomina/generacuotas-extra'},
        // {titulo: 'Empleado', url:'/nomina/empleado'},
        // {titulo: 'Compañía', url:'/nomina/compania'},
        // {titulo: 'Escala Salarial', url:'/nomina/escalaSalarial'},
        // {titulo: 'Parámetros Generales', url:'/nomina/parametros'},
        // {titulo: 'Asignaciones', url:'/nomina/asignaciones'},
        // {titulo: 'Deducciones', url:'/nomina/deducciones'},
        // {titulo: 'Rxjs', url:'/nomina/rxjs'},
        // {titulo: 'Usuario', url:'/nomina/usuario'},
        // {titulo: 'Proceso Nómina', url:'/nomina/prcnomina'}
      ]
    },
    {
      titulo:'Procesos',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo: 'Aplicar pago', url:'/nomina/recibo'},
        {titulo: 'Generar Cuotas', url:'/nomina/generacuotas'},
        {titulo: 'Generar Cuotas Extra', url:'/nomina/generacuotas-extra'},
        // {titulo: 'Entrada de Diario', url:'/contabilidad/entradadiario'},
        // {titulo: 'Balanza de comprobación', url:'/contabilidad/balanzacomprobacion'}
      ]
    },
    {
      titulo:'Consultas',
      // icono:'mdi mdi-folder-lock-open',
      icono:'mdi mdi-eye',
      // icono:'mdi mdi-glasses',
      submenu:[
        {titulo: 'Consultar Pagos', url:'/nomina/consultar-pagos'},
        {titulo: 'Consulta General Saldos', url:'/nomina/consulta-general-saldos'},
        {titulo: 'Consulta General Pagos', url:'/nomina/consulta-general-pagos'},
      ]
    }
  ];


  constructor() { }
}
