import { ToppingsAction } from './../actions/topppings.actions';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as toppingsAction from '../actions/topppings.actions';
import * as fromServices from '../../services/toppings.service';
import { ToppingsService } from '../../services/toppings.service';
import { LoadToppingsFail } from '../actions/topppings.actions';

@Injectable()
export class ToppingsEffects {
  constructor(private action$: Actions, private toppingsService: fromServices.ToppingsService) {}

  @Effect()
  loadTopping$ = this.action$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
          map(toppings => new toppingsAction.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingsAction.LoadToppingsFail(error)))
      )
  })
  )
}
