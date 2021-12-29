import { Component, OnDestroy } from "@angular/core";
import { Observable, interval, Subscription } from "rxjs";
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styleUrls: ["./rxjs.component.css"],
})
export class RxjsComponent implements OnDestroy {
  intervalSubscription: Subscription;

  constructor() {
    this.intervalSubscription = this.retornaIntervalo().subscribe((valor) =>
      console.log(valor)
    );
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000).pipe(
      take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error("i llego al valor 2");
        }
      }, 1000);
    });
    return obs$;
  }
}
