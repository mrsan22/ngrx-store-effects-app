import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizzas from '../actions/pizzas.actions';

export interface PizzaState {
  /**
   * basic entities structure.
   * {
   *   1: {
   *      id: 1,
   *      name: ''pizzaname',
   *      toppping: []
   *      }
   * }
   */
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}
export const initialState: PizzaState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      // [{id:1, name: string, toppings: []}, {id:2, name: string, toppings: []}]
      const pizzas = action.payload;
      // check the reduce function syntax(callbackFn, initialValue)
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          // initial value: all the entities
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    // run same code for both switch cases
    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };
      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

/**
 * Exposing some levels of pizza state.
 * @param state
 */
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;

/**
 * Selector is a function where we can compose different levels of states and return a new piece state.
 */
