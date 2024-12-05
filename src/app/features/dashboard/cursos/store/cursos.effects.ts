import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursosService } from '../../../../core/services/cursos.service';

@Injectable()
export class CursosEffects {
  loadCursos$;
  loadCursoById$;
  addCurso$;
  updateCurso$;
  deleteCurso$;

  constructor(private actions$: Actions, private cursosService: CursosService) {
    // Efecto para cargar todos los cursos
    this.loadCursos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.loadCursos),
        concatMap(() =>
          this.cursosService.getCursos().pipe(
            map((cursos) => CursosActions.loadCursosSuccess({ cursos })),
            catchError((error) => of(CursosActions.loadCursosFailure({ error })))
          )
        )
      );
    });

    // Cargar curso por ID
    this.loadCursoById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.loadCursoById),
        concatMap((action) =>
          this.cursosService.getById(action.id).pipe(
            map((curso) => CursosActions.loadCursoByIdSuccess({ curso })),
            catchError((error) => of(CursosActions.loadCursoByIdFailure({ error })))
          )
        )
      );
    });

    // Efecto para agregar un curso
    this.addCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.addCurso),
        concatMap((action) =>
          this.cursosService.addCurso(action.curso).pipe(
            map((curso) => CursosActions.addCursoSuccess({ curso })),
            catchError((error) => of(CursosActions.addCursoFailure({ error })))
          )
        )
      );
    });

    // Efecto para editar un curso
    this.updateCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.editCurso),
        concatMap((action) =>
          this.cursosService.updateCursoById(action.curso.id.toString(), action.curso).pipe( // Asegúrate de que el ID es consistente
            map((curso) => CursosActions.editCursoSuccess({ curso })),
            catchError((error) => of(CursosActions.editCursoFailure({ error })))
          )
        )
      );
    });
    


    // Efecto para eliminar un curso
    this.deleteCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.deleteCurso),
        concatMap((action) =>
          this.cursosService.removeCursoById(action.id).pipe(
            map(({ id }) => CursosActions.deleteCursoSuccess({ id })),
            catchError((error) => of(CursosActions.deleteCursoFailure({ error })))
          )
        )
      );
    });
  }
}
