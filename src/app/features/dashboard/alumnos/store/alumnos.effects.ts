import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, forkJoin } from 'rxjs';
import * as AlumnosActions from './alumnos.actions';
import { AlumnoService } from '../../../../core/services/alumnos.service';

@Injectable()
export class AlumnosEffects {
  loadAlumnos$;
  loadAlumnoById$;
  addAlumno$;
  updateAlumno$;
  deleteAlumno$;

  constructor(private actions$: Actions, private alumnoService: AlumnoService) {
    this.loadAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.loadAlumnos),
        concatMap(() =>
          this.alumnoService.getAlumnos().pipe(
            map((alumnos) =>
              AlumnosActions.loadAlumnosSuccess({ alumnos })
            ),
            catchError((error) =>
              of(AlumnosActions.loadAlumnosFailure({ error }))
            )
          )
        )
      );
    });

    this.loadAlumnoById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.loadAlumnoById),
        concatMap((action) =>
          this.alumnoService.getById(action.id).pipe(
            map((alumno) =>
              AlumnosActions.loadAlumnoByIdSuccess({ alumno })
            ),
            catchError((error) =>
              of(AlumnosActions.loadAlumnoByIdFailure({ error }))
            )
          )
        )
      );
    });

    this.addAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.addAlumno),
        concatMap((action) =>
          this.alumnoService.addAlumno(action.alumno).pipe(
            map((alumno) => AlumnosActions.addAlumnoSuccess({ alumno })),
            catchError((error) =>
              of(AlumnosActions.addAlumnoFailure({ error }))
            )
          )
        )
      );
    });

    this.updateAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.editAlumno),
        concatMap((action) =>
          this.alumnoService.updateAlumnoById(action.alumno.id, action.alumno).pipe(
            map((alumno) =>
              AlumnosActions.editAlumnoSuccess({ alumno })
            ),
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
          this.alumnoService.removeAlumnoById(action.id).pipe(
            map(({ id }) =>
              AlumnosActions.deleteAlumnoSuccess({ id })
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
