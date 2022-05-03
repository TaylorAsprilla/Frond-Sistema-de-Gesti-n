export enum Vacuna {
  MODERNA = 1,
  SINOVAC = 2,
  PFIZER = 3,
  JOHNSON_JOHNSON = 4,
  ASTRAZENECA = 5,
  SIN_VACUNA = 6,
  SINOPHARM = 7,
}

export enum Dosis {
  UNA_DOSIS = 1,
  DOS_DOSIS = 2,
  TERCERA_DOSIS = 3,
}

// Rangos de edad que no equieren vacuna
export enum RangosDeEdad {
  SIN_VACUNA = 3,
  UNA_VACUNA = 12,
}

export class VacunaModel {
  constructor(public id: number, public nombre: string, public estado: boolean) {}
}
