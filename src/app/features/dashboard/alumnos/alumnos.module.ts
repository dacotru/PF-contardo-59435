import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { alumnosReducer, alumnosFeatureKey } from './store/alumnos.reducer'; // Usa alumnosFeatureKey aquí
import { AlumnosEffects } from './store/alumnos.effects';


@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(alumnosFeatureKey, alumnosReducer), // Aquí usas alumnosFeatureKey
    EffectsModule.forFeature([AlumnosEffects]),
  ],
})
export class AlumnosModule {}
