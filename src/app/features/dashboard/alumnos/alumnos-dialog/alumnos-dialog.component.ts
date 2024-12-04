import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError } from 'rxjs/operators';
import * as AlumnosSelectors from '../store/alumnos.selectors';
import * as AlumnosActions from '../store/alumnos.actions';
import { Alumno } from '../models';

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styleUrls: ['./alumnos-dialog.component.scss'],
})
export class AlumnosDialogComponent {
  alumnoForm: FormGroup;
  isEditing: boolean;
  existingAlumnos$: Observable<Alumno[]>;

  constructor(
    private dialogRef: MatDialogRef<AlumnosDialogComponent>,
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { editingAlumno: Alumno | null }
  ) {
    this.isEditing = !!data.editingAlumno;

    // Obtener lista de alumnos existentes desde el Store
    this.existingAlumnos$ = this.store.select(AlumnosSelectors.selectAlumnosList);

    // Configuración del formulario
    this.alumnoForm = this.fb.group({
      id: [data.editingAlumno?.id || null],
      firstName: [
        data.editingAlumno?.firstName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        data.editingAlumno?.lastName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        data.editingAlumno?.email || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSave(): void {
    if (this.alumnoForm.valid) {
      const alumno = {
        firstName: this.alumnoForm.get('firstName')?.value || '',
        lastName: this.alumnoForm.get('lastName')?.value || '',
        email: this.alumnoForm.get('email')?.value || '',
        id: this.alumnoForm.get('id')?.value || undefined,
      };

      if (!this.isEditing) {
        // Validar duplicados al agregar
        this.checkDuplicate(alumno.email).subscribe((isDuplicate) => {
          if (isDuplicate) {
            this.setDuplicateError(true); // Configurar error de duplicado
          } else {
            this.addAlumno(alumno); // Agregar alumno si no hay duplicados
          }
        });
      } else {
        // Validar duplicados al editar (ignorar el ID del alumno actual)
        this.checkDuplicate(alumno.email, alumno.id).subscribe((isDuplicate) => {
          if (isDuplicate) {
            this.setDuplicateError(true); // Configurar error de duplicado
          } else {
            this.editAlumno(alumno as Alumno); // Editar alumno
          }
        });
      }
    } else {
      this.alumnoForm.markAllAsTouched(); // Marcar campos como tocados si son inválidos
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private checkDuplicate(email: string, excludeId?: string): Observable<boolean> {
    return this.existingAlumnos$.pipe(
      debounceTime(300),
      map((alumnos) =>
        alumnos.some(
          (existingAlumno) =>
            existingAlumno.email.toLowerCase() === email.toLowerCase() &&
            existingAlumno.id !== excludeId // Ignorar el ID del alumno que se está editando
        )
      ),
      catchError(() => of(false)) // Asume que no hay duplicados si ocurre un error
    );
  }

  private setDuplicateError(isDuplicate: boolean): void {
    if (isDuplicate) {
      this.alumnoForm.setErrors({ duplicateError: true }); // Configurar error en el formulario
    } else {
      const errors = this.alumnoForm.errors;
      if (errors) {
        delete errors['duplicateError'];
        this.alumnoForm.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
  }

  private addAlumno(alumno: Omit<Alumno, 'id' | 'createdAt'>): void {
    this.store.dispatch(AlumnosActions.addAlumno({ alumno }));
    this.dialogRef.close();
  }

  private editAlumno(alumno: Alumno): void {
    this.store.dispatch(AlumnosActions.editAlumno({ alumno }));
    this.dialogRef.close();
  }
}
