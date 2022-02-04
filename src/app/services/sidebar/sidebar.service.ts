import { Injectable } from '@angular/core';

export enum Role {
  ADMINISTRADOR = 'administrador',
  OBRERO = 'obrero',
  VOLUNTARIO = 'voluntario',
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'fas fa-home',
      role: [Role.ADMINISTRADOR],
      submenu: [
        { titulo: 'Inicio', url: '/' },
        { titulo: 'Gráficas', url: 'progress' },
      ],
    },
    // {
    //   titulo: 'Vacunación',
    //   icono: 'fas fa-notes-medical',
    //   submenu: [
    //     { titulo: 'Validación', url: 'validacion' },
    //     { titulo: 'Grafica1', url: 'grafica1' },
    //   ],
    // },
    {
      titulo: 'Administración',
      icono: 'fas fa-users-cog',
      role: [Role.ADMINISTRADOR],
      submenu: [
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Registro', url: '../registro' },
        { titulo: 'Ministerios', url: 'ministerios' },
        { titulo: 'Congregaciones', url: 'congregaciones' },
        { titulo: 'Campos', url: 'campos' },
        // { titulo: 'Permisos', url: 'permisos' },
      ],
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-users',
      submenu: [
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'Usuarios', url: 'usuarios' },
        // { titulo: 'Permisos', url: 'permisos' },
      ],
    },
  ];
  constructor() {}
}
