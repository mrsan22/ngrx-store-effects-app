import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  // pizzas: Pizza[]

  // only select from store that exist in Product state
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // gives back a slice of state
    // since we have used in 'products' string in StoreModule.forFeature() under products.module. So here we can pass the same string to store.select.
    // OR we can pass our 'getAllPizzas' selector to all the pizzas
    //this.store.select<any>('products').subscribe(state => console.log(state))
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    // The below load pizza dispatch now happens from Route Guards under Guards dir
    //this.store.dispatch(new fromStore.LoadPizzas());
    this.store.dispatch(new fromStore.LoadToppings());
  }
}
