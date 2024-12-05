import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as CursosSelectors from './store/cursos.selectors'; // Todos los selectores de Cursos
import * as CursosActions from './store/cursos.actions'; // Acciones de Cursos
import { Curso } from './models/'; // Modelo de Curso
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource<Curso>([]); // Tabla de Cursos
  displayedColumns: string[] = ['id', 'nombre', 'modalidad', 'profesor', 'acciones'];
  isLoading$: Observable<boolean>; // Estado de carga

  constructor(private store: Store, private dialog: MatDialog) {
    // Selector para el estado de carga
    this.isLoading$ = this.store.select(CursosSelectors.selectCursosLoading);
  }

  ngOnInit(): void {
    console.log('Despachando acción loadCursos...');
    // Despacha la acción para cargar cursos
    this.store.dispatch(CursosActions.loadCursos());

    // Suscríbete al selector para obtener la lista de cursos
    this.store.select(CursosSelectors.selectCursosList).subscribe((cursos) => {
      console.log('Cursos recibidos del store:', cursos);
      this.dataSource.data = cursos || [];
    });
  }

  // Abrir diálogo para agregar o editar cursos
  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      data: curso,
    });
  
    dialogRef.afterClosed().subscribe((result: Curso | undefined) => {
      if (result) {
        if (curso?.id) {
          // Editar curso existente
          console.log('Editando curso:', { ...curso, ...result });
          this.store.dispatch(CursosActions.editCurso({ curso: { ...curso, ...result } }));
        } else {
          // Agregar nuevo curso
          console.log('Agregando curso:', result);
          this.store.dispatch(CursosActions.addCurso({ curso: result }));
        }
      }
    });
  }
  

  // Eliminar curso
  deleteCurso(id: number): void {
    if (confirm('¿Estás seguro que quieres eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
    }
  }
}
