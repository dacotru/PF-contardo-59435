import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionDialogComponent } from './inscripcion-dialog/inscripcion-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent {
  displayedColumns: string[] = ['id', 'estudiante', 'curso', 'acciones'];
  dataSource = [
    { id: 1, estudiante: 'Juan Pérez', curso: 'Matemáticas' },
    { id: 2, estudiante: 'Ana Gómez', curso: 'Historia' },
  ];

  constructor(private dialog: MatDialog) {}

  abrirDialogo(data?: any): void {
    const dialogRef = this.dialog.open(InscripcionDialogComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (data) {
          // Editar inscripción
          const index = this.dataSource.findIndex((i) => i.id === data.id);
          if (index >= 0) this.dataSource[index] = resultado;
        } else {
          // Nueva inscripción
          resultado.id = this.dataSource.length + 1; // Generar un ID
          this.dataSource.push(resultado);
        }
      }
    });
  }

  eliminarInscripcion(id: number): void {
    this.dataSource = this.dataSource.filter((i) => i.id !== id);
  }
}
