import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { InscripcionesActions } from './store/inscripciones.actions';
import {
  selectIsLoadingInscripciones,
  selectLoadInscripcionesError,
  selectInscripciones,
} from './store/inscripciones.selectors';
import { selectAlumnos } from '../alumnos/store/alumnos.selectors';
import { selectAllCursos } from '../cursos/store/cursos.selectors';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';
import { Inscripcion } from './models';
import { Alumno } from '../alumnos/models';
import { Curso } from '../cursos/models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
})
export class InscripcionesComponent implements OnInit {
  inscripciones$: Observable<Inscripcion[]>;
  alumnos$: Observable<Alumno[]>;
  cursos$: Observable<Curso[]>;
  isLoading$: Observable<boolean>;
  loadError$: Observable<Error | null>;

  inscripcionForm: FormGroup;
  dataSource = new MatTableDataSource<Inscripcion>([]);
  displayedColumns: string[] = ['id', 'alumnoId', 'cursoId', 'acciones'];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    // Form initialization
    this.inscripcionForm = this.fb.group({
      alumnoId: [null, [Validators.required]],
      cursoId: [null, [Validators.required]],
    });

    // State selectors
    this.inscripciones$ = this.store.select(selectInscripciones);
    this.alumnos$ = this.store.select(selectAlumnos);
    this.cursos$ = this.store.select(selectAllCursos);
    this.isLoading$ = this.store.select(selectIsLoadingInscripciones);
    this.loadError$ = this.store.select(selectLoadInscripcionesError);
  }

  ngOnInit(): void {
    // Dispatch actions to load necessary data
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());

    // Sync dataSource with the store's inscripciones state
    this.inscripciones$.subscribe((inscripciones) => {
      this.dataSource.data = inscripciones || [];
    });
  }

  onSubmit(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
    } else {
      const { alumnoId, cursoId } = this.inscripcionForm.value;
      this.store.dispatch(
        InscripcionesActions.createInscripcion({ alumnoId, cursoId })
      );
      this.inscripcionForm.reset();
    }
  }

  openDialog(inscripcion?: Inscripcion): void {
    const dialogRef = this.dialog.open(InscripcionesDialogComponent, {
      width: '400px',
      data: inscripcion || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (inscripcion) {
          this.store.dispatch(
            InscripcionesActions.editInscripcion({
              inscripcion: { ...inscripcion, ...result },
            })
          );
        } else {
          this.store.dispatch(InscripcionesActions.createInscripcion(result));
        }
      }
    });
  }

  deleteInscripcion(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
    }
  }
}
