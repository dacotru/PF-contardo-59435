import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';
import { Inscripcion } from '../models';
import { selectAlumnos } from '../../alumnos/store/alumnos.selectors';
import { selectCursosList } from '../../cursos/store/cursos.selectors';
import { InscripcionesActions } from '../store/inscripciones.actions';

@Component({
  selector: 'app-inscripciones-dialog',
  templateUrl: './inscripciones-dialog.component.html',
  styleUrls: ['./inscripciones-dialog.component.scss'],
})
export class InscripcionesDialogComponent implements OnInit {
  inscripcionForm: FormGroup;
  alumnoOptions$: Observable<Alumno[]>;
  cursoOptions$: Observable<Curso[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscripcionesDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion | null
  ) {
    this.inscripcionForm = this.fb.group({
      alumnoId: ['', [Validators.required]],
      cursoId: ['', [Validators.required]],
    });

    this.alumnoOptions$ = this.store.select(selectAlumnos);
    this.cursoOptions$ = this.store.select(selectCursosList);
  }

  ngOnInit(): void {
    if (!this.data) {
      this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());
    }
  
    this.alumnoOptions$ = this.store.select(selectAlumnos);
    this.cursoOptions$ = this.store.select(selectCursosList);
  }
  

  onSave(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.inscripcionForm.value });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
