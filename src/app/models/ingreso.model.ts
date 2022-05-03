export class IngresoModel {
  constructor(
    public id_daIngreso: number,
    public id_usuario: number,
    public id_congregacion: number,
    public createdAt: Date,
    public updatedAt: string
  ) {}
}
