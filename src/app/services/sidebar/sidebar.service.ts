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
      titulo: 'Inicio',
      icono: 'fas fa-home',
      role: [Role.ADMINISTRADOR],
      submenu: [{ titulo: 'Dashboard', url: '/' }],
    },
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
      ],
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-users',
      submenu: [
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'Usuarios', url: 'usuarios' },
      ],
    },
  ];
  constructor() {}
}
