import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaid, 10);
        return this.hasPizza(id);
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return (
      this.store
        .select(fromStore.getPizzasEntities)
        // '!!' typecast to boolean
        .pipe(map((entities: { [key: number]: Pizza }) => !!entities[id]), take(1))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      // take 1 value, basically it will take the 'loaded' property and call observable complete and unsubscribe.
      take(1)
    );
  }
}
