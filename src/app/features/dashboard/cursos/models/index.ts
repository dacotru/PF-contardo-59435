export interface Curso {
  id: string;
  name: string;
  startDate: Date | null; // Permite valores null
  endDate: Date | null;   // Permite valores null
}
