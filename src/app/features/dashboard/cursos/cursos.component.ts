import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Curso } from './models';
import * as CursosSelectors from './store/cursos.selectors';
import * as CursosActions from './store/cursos.actions';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>();
  isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.isLoading$ = this.store.select(CursosSelectors.selectCursosLoading);
  }

  ngOnInit(): void {
    this.loadCursos();
    this.store.select(CursosSelectors.selectCursosList).subscribe((cursos) => {
      this.dataSource.data = cursos || []; // Asigna un arreglo vacío si `cursos` es null
    });
  }

  loadCursos(): void {
    this.store.dispatch(CursosActions.loadCursos());
  }

  openModal(curso?: Curso): void {
    const dialogRef = this.matDialog.open(CursosDialogComponent, {
      data: { editingCurso: curso },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCursos(); // Recargar cursos tras cerrar el modal
      }
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
    }
  }
}
