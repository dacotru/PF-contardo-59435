import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';

import { AlumnosActions } from './alumnos.actions';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Injectable()
export class AlumnosEffects {
  loadAlumnos$: any;
  createAlumno$: any;
  editAlumno$: any;
  deleteAlumno$: any;

  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService
  ) {
    // Cargar alumnos
    this.loadAlumnos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AlumnosActions.loadAlumnos),
        concatMap(() =>
          this.alumnosService.getAlumnos().pipe(
            map((alumnos) => AlumnosActions.loadAlumnosSuccess({ alumnos })),
            catchError((error) =>
              of(AlumnosActions.loadAlumnosFailure({ error }))
            )
          )
        )
      )
    );

    // Crear alumno
    this.createAlumno$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AlumnosActions.createAlumno),
        concatMap((action) =>
          this.alumnosService.createAlumno(action.alumno).pipe(
            map((alumno) => AlumnosActions.createAlumnoSuccess({ alumno })),
            catchError((error) =>
              of(AlumnosActions.createAlumnoFailure({ error }))
            )
          )
        )
      )
    );

    // Editar alumno
    this.editAlumno$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AlumnosActions.editAlumno),
        concatMap((action) =>
          this.alumnosService
            .updateAlumnoById(action.alumno.id, action.alumno)
            .pipe(
              map(() =>
                AlumnosActions.editAlumnoSuccess({ alumno: action.alumno })
              ),
              catchError((error) =>
                of(AlumnosActions.editAlumnoFailure({ error }))
              )
            )
        )
      )
    );

    // Eliminar alumno
    this.deleteAlumno$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AlumnosActions.deleteAlumno),
        concatMap((action) =>
          this.alumnosService.removeAlumnoById(action.id).pipe(
            map(() => AlumnosActions.deleteAlumnoSuccess({ id: action.id })),
            catchError((error) =>
              of(AlumnosActions.deleteAlumnoFailure({ error }))
            )
          )
        )
      )
    );
  }
}
