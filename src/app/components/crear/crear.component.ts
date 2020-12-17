import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: [
  ]
})
export class CrearComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  id: string | null;
  loading: boolean;

  constructor( private fb: FormBuilder,
               private empleadosService: EmpleadosService, private router: Router, private aRoute: ActivatedRoute ) {
    this.createEmpleado = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      salario: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
      this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if ( this.createEmpleado.invalid ) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado() {
    this.loading = true;
    const empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      salario: this.createEmpleado.value.salario,
      fechaNacimiento: this.createEmpleado.value.fechaNacimiento,
      actualizado: new Date()
    };

    this.empleadosService.agregarEmpleado(empleado)
      .then(() => {
        swal.fire('Creado', 'Empleado creado con éxito', 'success');
        this.loading = false;
        this.router.navigate(['/empleados']);
      }).catch( error => {
        this.loading = false;
        console.log(error);
      });

  }


  editarEmpleado( id: string ) {
    this.loading = true;
    const empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      salario: this.createEmpleado.value.salario,
      fechaNacimiento: this.createEmpleado.value.fechaNacimiento,
      actualizado: new Date()
    };

    this.empleadosService.updateEmpleado(id, empleado).then(() => {
      swal.fire('Actualizado', 'Se ha actualizado el empleado con éxito', 'success');
      this.loading = false;
      this.router.navigate(['/empleados']);
    });
  }

  esEditar() {
    if ( this.id != null ) {
      this.empleadosService.getEmpleado(this.id).subscribe( resp => {
        this.createEmpleado.setValue({
          nombre: resp.payload.data()['nombre'],
          apellido: resp.payload.data()['apellido'],
          salario: resp.payload.data()['salario'],
          fechaNacimiento: resp.payload.data()['fechaNacimiento']
        });
      });
    }
  }

}
