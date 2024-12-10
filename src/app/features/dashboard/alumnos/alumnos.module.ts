import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './store/alumnos.effects';
import { StoreModule } from '@ngrx/store';
import { alumnosFeature } from './store/alumnos.reducer';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(alumnosFeature),
    EffectsModule.forFeature([AlumnosEffects]),
  ],
})
export class AlumnosModule {}
