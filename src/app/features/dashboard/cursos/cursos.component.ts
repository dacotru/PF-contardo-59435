import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CursosActions } from './store/cursos.actions';
import { selectCursosList,selectCursosLoading } from './store/cursos.selectors';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { Curso } from './models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit {
  cursoForm: FormGroup;
  dataSource = new MatTableDataSource<Curso>([]);
  displayedColumns: string[] = ['id', 'nombre', 'modalidad', 'profesor', 'acciones'];
  cursos$: Observable<Curso[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      modalidad: ['', Validators.required],
      profesor: ['', Validators.required],
    });

    this.cursos$ = this.store.select(selectCursosList);
    this.isLoading$ = this.store.select(selectCursosLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());

    this.cursos$.subscribe((cursos) => {
      this.dataSource.data = cursos || [];
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const { nombre, modalidad, profesor } = this.cursoForm.value;
      this.store.dispatch(
        CursosActions.createCurso({ nombre, modalidad, profesor })
      );
      this.cursoForm.reset();
    }
  }
  
  

  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      width: '400px',
      data: curso || null,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (curso) {
          // Editar curso existente
          this.store.dispatch(
            CursosActions.editCurso({ curso: { ...curso, ...result } })
          );
        } else {
          // Crear un nuevo curso
          this.store.dispatch(
            CursosActions.createCurso(result)
          );
        }
      }
    });
  }
  
  

  deleteCurso(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
    }
  }
}
