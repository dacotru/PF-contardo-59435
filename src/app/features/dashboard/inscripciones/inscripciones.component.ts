import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';

import { InscripcionesActions } from './store/inscripciones.actions';
import {
  selectInscripcionesList,
  selectAlumnosOptions,
  selectCursosOptions,
  selectIsLoadingInscripciones,
} from './store/inscripciones.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
})
export class InscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'acciones'];

  alumnosOptions$: Observable<any[]>;
  cursosOptions$: Observable<any[]>;
  inscripciones$: Observable<any[]>;
  isLoading$: Observable<boolean>; // Agregar la carga de estado

  alumnos: any[] = [];
  cursos: any[] = [];
  inscripciones: any[] = [];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.inscripcionForm = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.alumnosOptions$ = this.store.select(selectAlumnosOptions);
    this.cursosOptions$ = this.store.select(selectCursosOptions);
    this.inscripciones$ = this.store.select(selectInscripcionesList);
    this.isLoading$ = this.store.select(selectIsLoadingInscripciones); // Seleccionar el estado de carga
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());

    // Combina los tres observables: inscripciones, alumnos, y cursos
    combineLatest([this.inscripciones$, this.alumnosOptions$, this.cursosOptions$])
      .subscribe(([inscripciones, alumnos, cursos]) => {
        this.alumnos = alumnos;
        this.cursos = cursos;

        // Transformar las inscripciones
        this.inscripciones = inscripciones.map((inscripcion) => {
          const alumno = this.alumnos.find(a => a.id === inscripcion.alumnoId);
          const curso = this.cursos.find(c => c.id === inscripcion.cursoId);

          return {
            ...inscripcion,
            alumnoNombre: alumno ? `${alumno.firstName} ${alumno.lastName}` : 'Desconocido',
            cursoNombre: curso ? curso.nombre : 'Desconocido'
          };
        });

        this.dataSource.data = this.inscripciones;
      });
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      this.store.dispatch(
        InscripcionesActions.createInscripcion(this.inscripcionForm.value)
      );
      this.inscripcionForm.reset();
    }
  }

  openDialog(inscripcion?: any): void {
    const dialogRef = this.dialog.open(InscripcionesDialogComponent, {
      width: '400px',
      data: inscripcion || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (inscripcion) {
          this.store.dispatch(
            InscripcionesActions.editInscripcion({ inscripcion: result })
          );
        } else {
          this.store.dispatch(
            InscripcionesActions.createInscripcion(result)
          );
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
