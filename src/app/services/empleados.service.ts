import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor( private firestore: AngularFirestore ) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('actualizado', 'asc')).add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados').snapshotChanges();
  }

  eliminarEmpleado( id: string ): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  updateEmpleado(id: string, empleado: any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update( empleado );
  }
}
