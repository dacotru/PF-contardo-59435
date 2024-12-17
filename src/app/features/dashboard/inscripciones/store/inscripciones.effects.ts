import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, forkJoin, map, of } from 'rxjs';

import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { CursosService } from '../../../../core/services/cursos.service';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$: any;
  createInscripcion$: any;
  editInscripcion$: any;
  deleteInscripcion$: any;
  loadAlumnosAndCursosOptions$: any;

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
    // Cargar inscripciones
    this.loadInscripciones$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.loadInscripciones),
        concatMap(() =>
          this.inscripcionesService.getInscripciones().pipe(
            map((inscripciones) =>
              InscripcionesActions.loadInscripcionesSuccess({ inscripciones })
            ),
            catchError((error) =>
              of(InscripcionesActions.loadInscripcionesFailure({ error }))
            )
          )
        )
      )
    );

    // Crear inscripción
    this.createInscripcion$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.createInscripcion),
        concatMap((action) =>
          this.inscripcionesService
            .createInscripcion({
              alumnoId: action.alumnoId,
              cursoId: action.cursoId,
            })
            .pipe(
              map(() => InscripcionesActions.loadInscripciones()), // Refresca la lista
              catchError((error) =>
                of(InscripcionesActions.createInscripcionFailure({ error }))
              )
            )
        )
      )
    );

    // Editar inscripción
    this.editInscripcion$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.editInscripcion),
        concatMap((action) =>
          this.inscripcionesService
            .updateInscripcionById(action.inscripcion.id, action.inscripcion)
            .pipe(
              map(() => InscripcionesActions.loadInscripciones()), // Refresca la lista
              catchError((error) =>
                of(InscripcionesActions.editInscripcionFailure({ error }))
              )
            )
        )
      )
    );

    // Eliminar inscripción
    this.deleteInscripcion$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.deleteInscripcion),
        concatMap((action) =>
          this.inscripcionesService.removeInscripcionById(action.id).pipe(
            map(() => InscripcionesActions.loadInscripciones()), // Refresca la lista
            catchError((error) =>
              of(InscripcionesActions.deleteInscripcionFailure({ error }))
            )
          )
        )
      )
    );

    // Cargar opciones de alumnos y cursos
    this.loadAlumnosAndCursosOptions$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.loadAlumnosAndCursosOptions),
        concatMap(() =>
          forkJoin([
            this.alumnosService.getAlumnos(),
            this.cursosService.getCursos(),
          ]).pipe(
            map(([alumnos, cursos]) =>
              InscripcionesActions.loadAlumnosAndCursosOptionsSuccess({
                alumnos,
                cursos,
              })
            ),
            catchError((error) =>
              of(
                InscripcionesActions.loadAlumnosAndCursosOptionsFailure({
                  error,
                })
              )
            )
          )
        )
      )
    );
  }
}
