import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './index';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthInfo = createSelector(
  selectAuthState,
  (state) => state.authInfo
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authInfo?.user || null
);
