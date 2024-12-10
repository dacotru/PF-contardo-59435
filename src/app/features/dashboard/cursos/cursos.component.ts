import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CursosActions } from './store/cursos.actions';
import { selectAllCursos } from './store/cursos.selectors';
import { Curso } from './models';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource<Curso>([]);
  displayedColumns: string[] = ['id', 'nombre', 'modalidad', 'profesor', 'acciones'];

  cursos$: Observable<Curso[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.cursos$ = this.store.select(selectAllCursos);
  }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());
    this.cursos$.subscribe((cursos) => {
      this.dataSource.data = cursos ?? [];
    });
  }

  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      width: '400px',
      data: curso || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (curso) {
          this.store.dispatch(
            CursosActions.editCurso({ curso: { ...curso, ...result } })
          );
        } else {
          this.store.dispatch(CursosActions.createCurso(result));
        }
      }
    });
  }

  deleteCurso(id: string): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
    }
  }
}
