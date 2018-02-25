// Listen to LOAD_PIZZAS action and then via side effect talk to local server and get the pizzas and then generate LOAD_SUCCESS action along with data for the reducer.
// Services are injected here to make http requests.
// Effects is essentially a class that few properties that are observable.
// Inject Services here for http calls, etc.
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';

import * as pizzaAction from '../actions';
import { PizzasService } from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(private action$: Actions, private pizzaService: PizzasService) {}

  @Effect() // This is an effect, which will dispatch an action back to our reducer
  // @Effect(dispatch: false) - If we do not want to dispatch an action from an Effect
  // listen to action here coming from components
  // loadPizza$ is an Obervable<Action>
  loadPizzas$ = this.action$.ofType(pizzaAction.LOAD_PIZZAS).pipe(
    // switch to a brand new observable
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(pizzas => new pizzaAction.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaAction.LoadPizzasFail(error)))
        );
    })
  );

  @Effect() // An effect listening to create_pizza action.
  // Create pizza and then issues a success action back to component.
  createPizza$ = this.action$.ofType(pizzaAction.CREATE_PIZZA).pipe(
    map((action: pizzaAction.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaAction.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaAction.CreatePizzaFail(error)))
        );
    })
  );

  // Listen to side-effects for navigation
  // Flow of action: so action at Line 44: pizzaAction.CreatePizzaSuccess will run first and the control goes to reducer. The reducer then also call below Effect.
  @Effect()
  createPizzaSuccess$ = this.action$.ofType(pizzaAction.CREATE_PIZZA_SUCCESS).pipe(
    map((action: pizzaAction.CreatePizzaSuccess) => action.payload),
    map(pizza => {
      return new fromRoot.Go({ path: ['/products', pizza.id] });
    })
  );

  @Effect() // An effect listening to update_pizza action.
  // It then returns the action back to reducer.
  UpdatePizza$ = this.action$.ofType(pizzaAction.UPDATE_PIZZA).pipe(
    map((action: pizzaAction.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaAction.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaAction.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect() // An effect listening to remove_pizza action.
  // It then returns the action back to reducer.
  RemovePizza$ = this.action$.ofType(pizzaAction.REMOVE_PIZZA).pipe(
    map((action: pizzaAction.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        // no pizza given back in case of delete
        map(() => new pizzaAction.RemovePizzaSuccess(pizza)),
        catchError(error => of(new pizzaAction.RemovePizzaFail(error)))
      );
    })
  );

  // ofType accepts string [] action
  @Effect()
  handlePizzaSuccess$ = this.action$.ofType(pizzaAction.UPDATE_PIZZA_SUCCESS, pizzaAction.REMOVE_PIZZA_SUCCESS).pipe(
    map(pizza => {
      return new fromRoot.Go({
        path: ['/products']
      });
    })
  );
}
