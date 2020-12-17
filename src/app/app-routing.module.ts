import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CrearComponent } from './components/crear/crear.component';

const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent},
  { path: 'crear', component: CrearComponent},
  { path: 'editar/:id', component: CrearComponent},
  { path: '', pathMatch: 'full', redirectTo: 'empleados'},
  { path: '**', pathMatch: 'full', redirectTo: 'empleados'}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
