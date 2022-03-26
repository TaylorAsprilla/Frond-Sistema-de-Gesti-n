import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sistemaGestion';

  constructor(public router: Router) {
    const navEndEvents$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-XB0KH3YXFQ', {
        page_path: event.urlAfterRedirects,
      });
    });
  }
}
