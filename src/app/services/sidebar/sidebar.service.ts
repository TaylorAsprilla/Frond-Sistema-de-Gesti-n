import { Injectable } from '@angular/core';

export enum PermisoEnum {
  ADMINISTRADOR = 'ADMINISTRADOR',
  OBRERO = 'OBRERO',
  VOLUNTARIO = 'VOLUNTARIO',
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-home',
      permisos: [PermisoEnum.VOLUNTARIO],
      submenu: [
        { titulo: 'Ingreso', url: '/' },
        { titulo: 'Registro', url: '../registro' },
      ],
    },
    {
      titulo: 'Administración',
      icono: 'fas fa-users-cog',
      permisos: [PermisoEnum.ADMINISTRADOR],
      submenu: [
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Registro', url: '../registro' },
        { titulo: 'Ministerios', url: 'ministerios' },
        { titulo: 'Congregaciones', url: 'congregaciones' },
        { titulo: 'Campos', url: 'campos' },
      ],
    },
    {
      titulo: 'Informes',
      icono: 'fas fa-chart-line',
      permisos: [PermisoEnum.ADMINISTRADOR],
      submenu: [{ titulo: 'Informe de Ingreso', url: 'informe' }],
    },
  ];
  constructor() {}
}
