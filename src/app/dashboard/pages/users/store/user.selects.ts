import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './index';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectIsLoadingUsers = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectHasErrorUsers = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectOneUser = createSelector(
  selectUserState,
  (state) => state.user
);
