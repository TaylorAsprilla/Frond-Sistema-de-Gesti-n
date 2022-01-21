import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sistemaGestion';

  ngAfterViewInit() {
    $('[data-widget="treeview"]').each(function () {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }
}
