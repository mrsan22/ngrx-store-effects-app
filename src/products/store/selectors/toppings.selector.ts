import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';


// selectors allows us to traverse our state tree and return required data structure.
// Sample State Tree
// {
//   products: {
//     reducerRouter: {}
//     pizzas: {},
//     toppings: {}
//   }
// }
export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
)

// get all toppings
export const getAllToppings = createSelector(getToppingsEntities, entities => {
  //[1,2,3].map()
  // Object.keys() returns a string array
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getToppingsLoaded = createSelector(getToppingsState, fromToppings.getToppingLoaded);
export const getToppingsLoading = createSelector(getToppingsState, fromToppings.getToppingLoading);
