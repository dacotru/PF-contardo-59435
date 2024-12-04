import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../models';

interface CursoDialogData {
  editingCurso?: Curso; // Propiedad opcional
}

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrls: ['./cursos-dialog.component.scss'],
})
export class CursosDialogComponent {
  cursoForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CursosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CursoDialogData
  ) {
    this.cursoForm = this.formBuilder.group({
      name: [data.editingCurso?.name || '', Validators.required],
      startDate: [
        data.editingCurso?.startDate ? this.formatDateToInput(data.editingCurso.startDate) : '',
        Validators.required,
      ],
      endDate: [
        data.editingCurso?.endDate ? this.formatDateToInput(data.editingCurso.endDate) : '',
        Validators.required,
      ],
    });
  }

  // Formatear la fecha al formato ISO para inputs de tipo date
  private formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Día con 2 dígitos
    return `${year}-${month}-${day}`;
  }

  onSave(): void {
    if (this.cursoForm.valid) {
      this.matDialogRef.close(this.cursoForm.value);
    }
  }

  onCancel(): void {
    this.matDialogRef.close();
  }
}
