import {
  Params,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromRouter from "@ngrx/router-store";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>("routerReducer");

// Custom Serializer
// Angular Router also has its own state tree: Router State Tree
// The ngrx router store will actually listen to Angular Routing events. Anytime you navigate anywhere or something changes in the url, below function will get called with new state.
export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState; // Equivalent const url = routerState.url;
    const { queryParams } = routerState.root;

    // Here we are hijacking Angular Router Tree and adding few properties in our ngrx state tree.
    let state: ActivatedRouteSnapshot = routerState.root;
    // loop over Angular Router State tree
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
