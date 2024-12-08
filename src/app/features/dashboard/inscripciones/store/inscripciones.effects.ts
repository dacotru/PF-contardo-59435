import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { CursosService } from '../../../../core/services/cursos.service';

@Injectable()
export class InscripcionesEffects {
  // Declaraciones de las propiedades de los efectos
  loadInscripciones$: Actions<Action<string>>;
  createInscripcion$: Actions<Action<string>>;
  createInscripcionSuccess$: Actions<Action<string>>;
  editInscripcion$: Actions<Action<string>>;
  deleteInscripcion$: Actions<Action<string>>;
  loadAlumnosAndCursosOptions$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
    // Efecto: Cargar inscripciones
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

    // Efecto: Crear inscripción
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
              map((inscripcion) =>
                InscripcionesActions.createInscripcionSuccess({ inscripcion })
              ),
              catchError((error) =>
                of(InscripcionesActions.createInscripcionFailure({ error }))
              )
            )
        )
      )
    );

    // Efecto: Crear inscripción exitosa y recargar inscripciones
    this.createInscripcionSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.createInscripcionSuccess),
        map(() => InscripcionesActions.loadInscripciones())
      )
    );

    // Efecto: Editar inscripción
    this.editInscripcion$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.editInscripcion),
        concatMap((action) =>
          this.inscripcionesService
            .updateInscripcionById(action.inscripcion.id, action.inscripcion)
            .pipe(
              map(() =>
                InscripcionesActions.loadInscripciones() // Recargar todas las inscripciones
              ),
              catchError((error) =>
                of(InscripcionesActions.editInscripcionFailure({ error }))
              )
            )
        )
      )
    );
    
    

    // Efecto: Eliminar inscripción
    this.deleteInscripcion$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.deleteInscripcion),
        concatMap((action) =>
          this.inscripcionesService.removeInscripcionById(action.id).pipe(
            map(() =>
              InscripcionesActions.deleteInscripcionSuccess({ id: action.id })
            ),
            catchError((error) =>
              of(InscripcionesActions.deleteInscripcionFailure({ error }))
            )
          )
        )
      )
    );

    // Efecto: Cargar opciones de alumnos y cursos
    this.loadAlumnosAndCursosOptions$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.loadAlumnosAndCursosOptions),
        concatMap(() =>
          forkJoin({
            alumnos: this.alumnosService.getAlumnos(),
            cursos: this.cursosService.getCursos(),
          }).pipe(
            map(({ alumnos, cursos }) =>
              InscripcionesActions.loadAlumnosAndCursosOptionsSuccess({
                alumnos,
                cursos,
              })
            ),
            catchError((error) =>
              of(InscripcionesActions.loadAlumnosAndCursosOptionsFailure({ error }))
            )
          )
        )
      )
    );
    
  }
}
