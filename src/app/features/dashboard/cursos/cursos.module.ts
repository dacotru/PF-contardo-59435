import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cursosReducer } from './store/cursos.reducer';
import { CursosEffects } from './store/cursos.effects';

@NgModule({
  declarations: [
    CursosComponent,
    CursosDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature('cursos', cursosReducer),
    EffectsModule.forFeature([CursosEffects]),
  ],
})
export class CursosModule {}
