import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoDetailComponent } from './alumnos-detail/alumnos-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
  },
  {
    path: ':id/detail',
    component: AlumnoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
