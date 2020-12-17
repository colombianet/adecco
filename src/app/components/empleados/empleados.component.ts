import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
  ]
})
export class EmpleadosComponent implements OnInit {

  public empleados: any[];
  public loading: boolean;

  constructor( private empleadosService: EmpleadosService ) {}

  ngOnInit(): void {
    this.loading = true;
    this.empleadosService.getEmpleados().subscribe( resp => {
      this.empleados = [];
      resp.forEach( (element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      this.loading = false;
    });
  }

  eliminarEmpleado(empleado: any) {
    swal.fire({
      title: 'Estás seguro?',
      text: `Estás a punto de eliminar a ${empleado.nombre} ${empleado.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadosService.eliminarEmpleado(empleado.id).then( () => {
          console.log('Empleado eliminado con éxito');
        }).catch( error => {
          console.log(error);
        });
        swal.fire(
          'Eliminado',
          'Empleado eliminado con éxito',
          'success'
        );
      }
    });
  }

}
