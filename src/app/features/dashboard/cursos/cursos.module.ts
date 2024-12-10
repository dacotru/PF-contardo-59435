import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursosFeature } from './store/cursos.reducer';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CursosComponent,
    CursosDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature(cursosFeature), // Uso correcto del feature
    EffectsModule.forFeature([CursosEffects]),
  ],
})
export class CursosModule {}
