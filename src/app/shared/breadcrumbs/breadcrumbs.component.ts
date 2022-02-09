import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnDestroy {
  titulo: string;
  tituloSubscription: Subscription;

  constructor(private router: Router) {
    this.tituloSubscription = this.getArgumentoRuta().subscribe((data) => {
      this.titulo = data.titulo;
      document.title = `Sistema de gestión - ${this.titulo} `;
    });
  }

  ngOnDestroy(): void {
    this.tituloSubscription.unsubscribe();
  }

  getArgumentoRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
