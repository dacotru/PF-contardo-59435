import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../models';
import { CursosService } from '../../../../core/services/cursos.service';
import { generateRandomString } from '../../../../shared/utils';

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrls: ['./cursos-dialog.component.scss'],
})
export class CursosDialogComponent {
  cursoForm: FormGroup;
  isSaving = false;

  constructor(
    public dialogRef: MatDialogRef<CursosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso | null,
    private fb: FormBuilder,
    private cursosService: CursosService
  ) {
    this.cursoForm = this.fb.group({
      nombre: [data ? this.capitalizeFirstLetter(data.nombre) : '', Validators.required],
      modalidad: [data ? data.modalidad : '', Validators.required],
      profesor: [data ? this.capitalizeFirstLetter(data.profesor) : '', Validators.required],
    });

    this.setupValueChanges();
  }

  setupValueChanges(): void {
    this.cursoForm.get('nombre')?.valueChanges.subscribe(value => {
      if (value) {
        const capitalizedValue = this.capitalizeFirstLetter(value);
        if (value !== capitalizedValue) {
          this.cursoForm.get('nombre')?.setValue(capitalizedValue, { emitEvent: false });
        }
      }
    });

    this.cursoForm.get('profesor')?.valueChanges.subscribe(value => {
      if (value) {
        const capitalizedValue = this.capitalizeFirstLetter(value);
        if (value !== capitalizedValue) {
          this.cursoForm.get('profesor')?.setValue(capitalizedValue, { emitEvent: false });
        }
      }
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  onSave(): void {
    if (this.cursoForm.invalid || this.isSaving) {
      this.cursoForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const updatedCurso: Curso = {
      ...this.cursoForm.value,
      id: this.data ? this.data.id : generateRandomString(8),
    };

    const saveObservable = this.data
      ? this.cursosService.updateCursoById(updatedCurso.id, updatedCurso)
      : this.cursosService.addCurso(updatedCurso);

    saveObservable.subscribe((result) => {
      this.isSaving = false;

      if (result) {
        this.dialogRef.close(result);
      } else if (!this.data) {
        alert('El curso con el mismo nombre y modalidad ya existe.');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
