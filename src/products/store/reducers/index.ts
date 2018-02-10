import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

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

// Creating Selectors:
// Selectors allows us to separate our app state with our component tree. We can compose our app state and then pass slices of state that we need to our component.
// Here from products, we just need pizzas.
// Holds a selector for entire lazy loaded module (Products)
export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizza state
// Compose 'Products' state to get the pizzas. It is going to return a 'Products.pizzas`. We are going down from products to select pizzas.
// This is going to create a selector from 'products' and then jump down a level.
// Give me products and then give me pizzas.
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// This returns the pizza entities
export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

// Return pizzas as Arrays
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
    //[1,2,3].map()
    // Object.keys() returns a string array
    return Object.keys(entities).map(id => entities[parseInt(id, 10)])
})
export const getAllPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getAllPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);


// Sample State Tree: A JS object
// entire ngrx store tree. 
/**
 * When the StoreModule.forFeature() loads the products feature module, below sample products state and reducer(pizzas) is attached to the App state by the ngrx store dynamically. 
 * 
 */
// const state = {
//     // getProductsState selector gives reference to 'products' below and we asking to go one level down to get pizzas using 'getPizzaState' selector.
//     products: {
//         // pizzas reducer
//         pizzas: {
//             data: [],
//             loading: false,
//             loaded: false
//         }
//     }
// }

/**
 * So when state.pizzas is returned, we are left with something like this:
 * {
        data: [],
        loading: false,
        loaded: false
 * }
 *  But lets say, we only need data, we create further selector such as 'getAllPizzas' to get only 'data' and so on...
 */