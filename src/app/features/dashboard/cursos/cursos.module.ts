import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CursosComponent } from './cursos.component';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CursosEffects } from './store/cursos.effects';
import { cursosReducer } from './store/cursos.reducer';

@NgModule({
  declarations: [CursosComponent, CursosDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature('cursos', cursosReducer),
    EffectsModule.forFeature([CursosEffects]),
  ],
})
export class CursosModule {}
