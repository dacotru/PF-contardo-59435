import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';
import { Inscripcion } from '../models';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { selectAlumnos } from '../../alumnos/store/alumnos.selectors';
import { selectAllCursos } from '../../cursos/store/cursos.selectors';

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
    this.cursoOptions$ = this.store.select(selectAllCursos);
  }

  ngOnInit(): void {
    // Despachar la acción para asegurar que las opciones estén cargadas
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());

    // Si estamos en modo edición, inicializar el formulario con los datos de la inscripción
    if (this.data) {
      this.inscripcionForm.patchValue({
        alumnoId: this.data.alumnoId,
        cursoId: this.data.cursoId,
      });
    }
  }

  onSave(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close({
        id: this.data?.id, // Incluye el ID solo si estamos editando
        alumnoId: this.inscripcionForm.value.alumnoId,
        cursoId: this.inscripcionForm.value.cursoId,
      });
    } else {
      this.inscripcionForm.markAllAsTouched(); // Marca los campos como tocados para mostrar errores
    }
  }
  
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
