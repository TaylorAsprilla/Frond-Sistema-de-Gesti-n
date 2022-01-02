import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'fas fa-angle-left',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Grafica1', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'RXJS', url: 'rxjs' },
      ],
    },
    {
      titulo: 'Vacunación',
      icono: 'fas fa-angle-left',
      submenu: [
        { titulo: 'Registro', url: '/' },
        { titulo: 'Validación', url: 'validacion' },
        { titulo: 'Grafica1', url: 'grafica1' },
      ],
    },
  ];
  constructor() {}
}
