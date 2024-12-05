import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from '../models/';

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
})
export class CursosDialogComponent implements OnInit {
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CursosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso
  ) {
    // Inicialización del formulario con los controles: 'nombre', 'modalidad' y 'profesor'
    this.cursoForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],  // Control 'nombre'
      modalidad: [data?.modalidad || '', Validators.required],  // Control 'modalidad'
      profesor: [data?.profesor || '', Validators.required],  // Control 'profesor'
    });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.cursoForm.valid) {
      this.dialogRef.close(this.cursoForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
