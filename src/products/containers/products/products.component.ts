import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
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
        <div *ngIf="!((pizzas)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[];

  // only select from store that exist in Product state
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // gives back a slice of state
    // since we have used in 'products' string in StoreModule.forFeature() under products.module. So here we are using the same string.
   this.store.select<any>('products').subscribe(state => {
     console.log(state)
   })
  }
}
