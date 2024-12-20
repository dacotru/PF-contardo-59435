import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CursosActions } from './store/cursos.actions';
import { selectAllCursos, selectIsLoadingCursos } from './store/cursos.selectors';
import { Curso } from './models';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { CursosDetailComponent } from './cursos-detail/cursos-detail.component';
import { selectAutheticatedUser } from '../../../store/selectors/auth.selector';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource<Curso>([]);
  displayedColumns: string[] = ['id', 'nombre', 'modalidad', 'profesor', 'acciones'];
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.isLoading$ = this.store.select(selectIsLoadingCursos);
    this.isAdmin$ = this.store.select(selectAutheticatedUser).pipe(
      map((user) => user?.role === 'Administrator') // Compara con "Administrator"
    );
  }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());
    this.store.select(selectAllCursos).subscribe((cursos) => {
      this.dataSource.data = cursos;
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
          const newCurso = {
            ...result,
            createdAt: new Date().toISOString(),
          };
          this.store.dispatch(CursosActions.createCurso({ curso: newCurso }));
        }
      }
    });
  }

  openDetail(curso: Curso): void {
    this.dialog.open(CursosDetailComponent, {
      width: '400px',
      data: { curso },
    });
  }

  deleteCurso(id: string): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
    }
  }
}
