export class MinisterioModel {
  constructor(
    public id: string,
    public nombre: string,
    public estado: boolean,
    public logo?: string,
    public descripcion?: string
  ) {}
}
