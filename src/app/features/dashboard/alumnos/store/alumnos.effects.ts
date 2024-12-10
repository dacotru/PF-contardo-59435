import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { AlumnosActions } from './alumnos.actions';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Action } from '@ngrx/store';

@Injectable()
export class AlumnosEffects {
  loadAlumnos$: Actions<Action<string>>;
  createAlumno$: Actions<Action<string>>;
  createAlumnoSuccess$: Actions<Action<string>>;
  editAlumno$: Actions<Action<string>>;
  deleteAlumno$: Actions<Action<string>>;
  

  constructor(private actions$: Actions, private alumnosService: AlumnosService) {
    this.loadAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.loadAlumnos),
        concatMap(() =>
          this.alumnosService.getAlumnos().pipe(
            map((alumnos) => AlumnosActions.loadAlumnosSuccess({ alumnos })),
            catchError((error) =>
              of(AlumnosActions.loadAlumnosFailure({ error }))
            )
          )
        )
      );
    });


    this.createAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.createAlumno),
        concatMap((action) =>
          this.alumnosService.createAlumno(action.alumno).pipe(
            map((alumno) =>
              AlumnosActions.createAlumnoSuccess({ alumno })
            ),
            catchError((error) =>
              of(AlumnosActions.createAlumnoFailure({ error }))
            )
          )
        )
      );
    });

    this.createAlumnoSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.createAlumnoSuccess),
        map(() => AlumnosActions.loadAlumnos())
      );
    });

    this.editAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.editAlumno),
        concatMap((action) =>
          this.alumnosService.updateAlumnoById(action.alumno.id, action.alumno).pipe(
            map((alumno) => {
              // Despacha el éxito de la edición, actualizando el estado con el alumno editado
              return AlumnosActions.editAlumnoSuccess({ alumno });
            }),
            catchError((error) =>
              of(AlumnosActions.editAlumnoFailure({ error }))
            )
          )
        )
      );
    });

    this.deleteAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.deleteAlumno),
        concatMap((action) =>
          this.alumnosService.removeAlumnoById(action.id).pipe(
            map(() =>
              AlumnosActions.deleteAlumnoSuccess({ id: action.id })
            ),
            catchError((error) =>
              of(AlumnosActions.deleteAlumnoFailure({ error }))
            )
          )
        )
      );
    });
  }
}
