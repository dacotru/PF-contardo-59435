import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from '../../../shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionDialogComponent } from './inscripcion-dialog/inscripcion-dialog.component';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule
    
  ],
  exports: [
    InscripcionesComponent,
  ],
})
export class InscripcionesModule {}
