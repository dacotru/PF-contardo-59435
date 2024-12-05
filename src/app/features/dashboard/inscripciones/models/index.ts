import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Inscripcion {
  id: string;       
  alumnoId: string; 
  cursoId: string; 
  alumno?: Alumno; 
  curso?: Curso; 
}
