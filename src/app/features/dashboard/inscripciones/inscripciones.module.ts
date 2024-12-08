import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from '../../../shared/shared.module';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature.name, inscripcionesFeature.reducer),
    EffectsModule.forFeature([InscripcionesEffects]),
    
    
  ],
})
export class InscripcionesModule {
  constructor(private store: Store) {
    // Despacha la acción para cargar alumnos y cursos automáticamente al cargar el módulo
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());
  }
}
