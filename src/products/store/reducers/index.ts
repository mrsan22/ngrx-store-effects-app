import { ActionReducerMap } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

/**
 * Interface for a slice of state. Top level state interface in products module (ProductsState) is just a map of keys to inner state types.
 */
export interface ProductsState {
   pizzas: fromPizzas.PizzaState 
}

/**
 * Our state is composed of a map of action reducer functions.  A slice of state is managed by individual reducers.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 * Here the pizzas reducer only manages a slice of state that consist of data, loading and loaded.
 */
export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer
}