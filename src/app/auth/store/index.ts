import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authFeatureKey, State, reducer as authReducer } from './auth.reducers';
export * from './auth.reducers';
export * from './auth.actions';

export interface AuthState {
  [authFeatureKey]: State;
}

export const reducers: ActionReducerMap<AuthState> = {
  [authFeatureKey]: authReducer,
};

export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
