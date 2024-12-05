import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CursosComponent } from './cursos/cursos.component'; // Importación directa

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      { path: 'cursos', 
        loadChildren: () => import('./cursos/cursos.module').then((m) => m.CursosModule)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./inscripciones/inscripciones.module').then(
            (m) => m.InscripcionesModule
          ),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
