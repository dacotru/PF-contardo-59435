import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { Action } from '@ngrx/store';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$: Actions<Action<string>>;
  createInscripcion$: Actions<Action<string>>;
  createInscripcionSuccess$: Actions<Action<string>>;
  editInscripcion$: Actions<Action<string>>;
  deleteInscripcion$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
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

    // Crear inscripción exitosa y recargar inscripciones
    this.createInscripcionSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscripcionesActions.createInscripcionSuccess),
        map(() => InscripcionesActions.loadInscripciones())
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
              map((inscripcion) =>
                InscripcionesActions.editInscripcionSuccess({ inscripcion })
              ),
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
  }
}
