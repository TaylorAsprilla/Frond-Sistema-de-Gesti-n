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
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        // { titulo: 'Grafica1', url: 'grafica1' },
        // { titulo: 'Promesas', url: 'promesas' },
        // { titulo: 'RXJS', url: 'rxjs' },
      ],
    },
    {
      titulo: 'Vacunación',
      icono: 'fas fa-notes-medical',
      submenu: [
        { titulo: 'Validación', url: 'validacion' },
        { titulo: 'Grafica1', url: 'grafica1' },
      ],
    },
    {
      titulo: 'Administración',
      icono: 'fas fa-user-lock',
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
  ];
  constructor() {}
}
