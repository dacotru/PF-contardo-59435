import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrls: ['./inscripcion-dialog.component.scss'],
})
export class InscripcionDialogComponent implements OnInit {
  inscripcionForm!: FormGroup;
  alumnos = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' },
  ];
  cursos = [
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Historia' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscripcionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos enviados al dialog (editar o crear)
  ) {}

  ngOnInit(): void {
    this.inscripcionForm = this.fb.group({
      id: [this.data?.id || null],
      alumnoId: [this.data?.alumnoId || '', Validators.required],
      cursoId: [this.data?.cursoId || '', Validators.required],
      fecha: [this.data?.fecha || new Date(), Validators.required],
    });
  }

  guardar(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close(this.inscripcionForm.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
