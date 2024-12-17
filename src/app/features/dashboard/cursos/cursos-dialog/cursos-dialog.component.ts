import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from '../models/';

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrls: ['./cursos-dialog.component.scss'],
})
export class CursosDialogComponent implements OnInit {
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CursosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso
  ) {
    // Inicialización del formulario
    this.cursoForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      modalidad: [data?.modalidad || '', Validators.required],
      profesor: [data?.profesor || '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.cursoForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.cursoForm.value });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
