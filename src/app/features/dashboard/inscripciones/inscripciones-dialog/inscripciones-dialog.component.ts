import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAlumnosOptions, selectCursosOptions } from '../store/inscripciones.selectors';
import { Inscripcion } from '../models/';
import { InscripcionesActions } from '../store/inscripciones.actions';

@Component({
  selector: 'app-inscripciones-dialog',
  templateUrl: './inscripciones-dialog.component.html',
  styleUrls: ['./inscripciones-dialog.component.scss'],
})
export class InscripcionesDialogComponent implements OnInit {
  inscripcionForm: FormGroup;
  alumnosOptions$: Observable<any[]>;
  cursosOptions$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscripcionesDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion | null
  ) {
    this.inscripcionForm = this.fb.group({
      alumnoId: [this.data?.alumnoId || '', Validators.required],
      cursoId: [this.data?.cursoId || '', Validators.required],
    });

    this.alumnosOptions$ = this.store.select(selectAlumnosOptions);
    this.cursosOptions$ = this.store.select(selectCursosOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());
  }

  onSave(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close({
        id: this.data?.id,
        ...this.inscripcionForm.value,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
