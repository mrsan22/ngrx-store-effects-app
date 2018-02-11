import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import { Pizza } from '../../models/pizza.model';

/**
 * We want to take data from RouterStore and compose it to go and select pizza entity using route param.
 */

// pizza state
// Compose 'Products' state to get the pizzas. It is going to return a 'Products.pizzas`. We are going down from products to select pizzas.
// This is going to create a selector from 'products' and then jump down a level.
// Give me products and then give me pizzas.
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// This returns the pizza entities
export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

// get the selected pizza from store and render it.
// Access state object in our router.
// Use Router State to look for pizza entity.
export const getSelectedPizza = createSelector(
  getPizzasEntities, // feature State
  fromRoot.getRouterState, // route state
  (entities, router): Pizza => {
    // composing new state using above two states.
    return router.state && entities[router.state.params.pizzaId];
  }
);

// Return pizzas as Arrays
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  //[1,2,3].map()
  // Object.keys() returns a string array
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getAllPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getAllPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
