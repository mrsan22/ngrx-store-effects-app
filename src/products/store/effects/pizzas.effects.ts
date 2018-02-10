// Listen to LOAD_PIZZAS action and then via side effect talk to local server and get the pizzas and then generate LOAD_SUCCESS action along with data for the reducer.
// Services are injected here to make http requests.
// Effects is essentially a class that few properties that are observable.
// Inject Services here for http calls, etc.
import { Injectable } from '@angular/core';

import {Effect, Actions} from '@ngrx/effects';
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError } from "rxjs/operators";

import * as pizzaAction from "../actions";
import { PizzasService } from '../../services';

@Injectable()
export class PizzasEffects {
    constructor(
        private action$: Actions,
        private pizzaService: PizzasService
    ) {}

    @Effect() // This is an effect, which will dispatch an action back to our reducer
    // @Effect(dispatch: false) - If we do not want to dispatch an action from an Effect
    // listen to action here coming from components
    // loadPizza$ is an Obervable<Action>
    loadPizzas$ = this.action$.ofType(pizzaAction.LOAD_PIZZAS)
    .pipe(
        // switch to a brand new observable
        switchMap(() => {
            return this.pizzaService.getPizzas().pipe(
                map(pizzas => new pizzaAction.LoadPizzasSuccess(pizzas)),
                catchError(error => of(new pizzaAction.LoadPizzasFail(error)))
            )
        })
    )
}
