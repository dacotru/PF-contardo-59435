import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';

import { CursosActions } from './cursos.actions';
import { CursosService } from '../../../../core/services/cursos.service';

@Injectable()
export class CursosEffects {
  loadCursos$: any;
  createCurso$: any;
  editCurso$: any;
  deleteCurso$: any;

  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ) {
    // Cargar cursos
    this.loadCursos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CursosActions.loadCursos),
        concatMap(() =>
          this.cursosService.getCursos().pipe(
            map((cursos) => CursosActions.loadCursosSuccess({ cursos })),
            catchError((error) =>
              of(CursosActions.loadCursosFailure({ error }))
            )
          )
        )
      )
    );

    // Crear curso
    this.createCurso$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CursosActions.createCurso),
        concatMap((action) =>
          this.cursosService.createCurso(action.curso).pipe(
            map((curso) => CursosActions.createCursoSuccess({ curso })),
            catchError((error) =>
              of(CursosActions.createCursoFailure({ error }))
            )
          )
        )
      )
    );

    // Editar curso
    this.editCurso$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CursosActions.editCurso),
        concatMap((action) =>
          this.cursosService
            .updateCursoById(action.curso.id, action.curso)
            .pipe(
              map((curso) => CursosActions.editCursoSuccess({ curso })),
              catchError((error) =>
                of(CursosActions.editCursoFailure({ error }))
              )
            )
        )
      )
    );

  this.deleteCurso$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CursosActions.deleteCurso),
    concatMap((action) =>
      this.cursosService.removeCursoById(action.id).pipe( // Usa el nombre correcto aquí
        map(() => CursosActions.deleteCursoSuccess({ id: action.id })),
        catchError((error) =>
          of(CursosActions.deleteCursoFailure({ error }))
        )
      )
    )
  )
  );

  }
}
