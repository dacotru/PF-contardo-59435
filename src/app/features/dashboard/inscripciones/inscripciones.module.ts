import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';
import { InscripcionesDetailComponent } from './inscripciones-detail/inscripciones-detail.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { inscripcionesReducer } from './store/inscripciones.reducer';
import { InscripcionesEffects } from './store/inscripciones.effects';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesDialogComponent,
    InscripcionesDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature('inscripciones', inscripcionesReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
})
export class InscripcionesModule {}
