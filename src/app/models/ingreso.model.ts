export class IngresoModel {
  constructor(
    public id_daIngreso: number,
    public id_usuario: number,
    public id_congregacion: number,
    public fecha_ingreso: string,
    public createdAt: Date,
    public updatedAt: string
  ) {}
}
